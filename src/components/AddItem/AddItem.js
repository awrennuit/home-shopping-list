import React, { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../App/App";
import Toast from "../Toast/Toast";
import "./AddItem.css";

export default function AddItem() {
  const { state, dispatch } = useContext(Context);
  const inputRef = useRef();
  const [itemToAdd, setItemToAdd] = useState("");
  const [isToast, setIsToast] = useState(false);

  useEffect(() => inputRef.current.focus(), []);

  const addItemToDatabase = () => {
    // send to firebase
    // if successful, show toast
    showToast();
    dispatch({ type: `ADD_ITEM`, payload: itemToAdd });
  };

  const focusInput = () => {
    setItemToAdd("");
    inputRef.current.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addItemToDatabase();
    focusInput();
  };

  const showToast = () => {
    setIsToast(true);
    setTimeout(() => {
      setIsToast(false);
    }, 2000);
  };

  return (
    <div id="add-wrapper">
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          id="add-input"
          onChange={(e) => setItemToAdd(e.target.value)}
          placeholder="what to buy?"
          ref={inputRef}
          type="text"
          value={itemToAdd}
        />
        <button id="add-btn" type="submit">
          +
        </button>
      </form>
      <Toast shown={isToast} />
    </div>
  );
}
