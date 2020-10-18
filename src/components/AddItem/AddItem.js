import React, { useContext, useEffect, useRef, useState } from "react";
import { db } from "../../firebase";
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
    try {
      updateDatabase();
      refreshApi();
      showToast();
    } catch (error) {
      alert(`Try again - something went wrong.`);
    }
  };

  const focusInput = () => {
    setItemToAdd("");
    inputRef.current.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (itemToAdd !== "") {
      addItemToDatabase();
      focusInput();
    }
  };

  const refreshApi = async () => {
    let payload = "";
    await db.ref(`items/`).once("value", (snap) => {
      payload = snap.val();
      delete payload[0];
    });
    dispatch({ type: `SET_ITEMS`, payload: payload });
  };

  const showToast = () => {
    setIsToast(true);
    setTimeout(() => {
      setIsToast(false);
    }, 2000);
  };

  const updateDatabase = () => {
    const randomId = Math.random().toString(36).substr(2, 13);
    db.ref(`items/`).update({
      [Object.values(state.items).length + randomId]: itemToAdd,
    });
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
