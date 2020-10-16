import React, { useEffect, useRef, useState } from "react";

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
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        onChange={(e) => setItemToAdd(e.target.value)}
        ref={inputRef}
        type="text"
        value={itemToAdd}
      />
      <button type="submit">Add</button>
    </form>
  );
}
