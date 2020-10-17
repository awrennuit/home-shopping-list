import React, { useEffect, useRef, useState } from "react";
import "./AddItem.css";

export default function AddItem() {
  const inputRef = useRef();
  const [itemToAdd, setItemToAdd] = useState("");

  useEffect(() => inputRef.current.focus(), []);

  const addItemToDatabase = () => {
    // send to firebase
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addItemToDatabase();
    focusInput();
  };

  const focusInput = () => {
    setItemToAdd("");
    inputRef.current.focus();
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
    </div>
  );
}
