import React, { useContext, useEffect, useState } from "react";
import { db } from "../../firebase";
import { Context } from "../App/App";
import "./Item.css";

export default function Checkbox(props) {
  const { state, dispatch } = useContext(Context);
  const [isChecked, setIsChecked] = useState(false);
  let timeout = null;

  useEffect(() => {
    if (isChecked) {
      timeout = setTimeout(() => {
        try {
          removeItemFromDatabase();
        } catch (error) {
          alert(`Try again - something went wrong.`);
        }
      }, 2000);
    }
  }, [isChecked]);

  useEffect(() => setIsChecked(false), [state.items]);

  const handleChange = () => {
    if (isChecked) {
      clearTimeout(timeout);
    }
    setIsChecked(!isChecked);
  };

  const refreshApi = async () => {
    let payload = "";
    await db.ref(`items/`).once("value", (snap) => {
      payload = snap.val();
      delete payload[0];
    });
    dispatch({ type: `SET_ITEMS`, payload: payload });
  };

  const removeItemFromDatabase = async () => {
    let keyToRemove = "";
    await db.ref().once("value", (snap) => {
      snap.forEach((child) => {
        const children = Object.entries(child.val());
        for (let item of children) {
          if (item[1] === props.label) keyToRemove = item[0];
        }
      });
    });
    await db.ref(`items/${keyToRemove}`).remove();
    refreshApi();
  };

  return (
    <label
      className={`checkbox-container ${isChecked ? "checked" : "unchecked"}`}
    >
      {props.label}
      <input
        checked={isChecked}
        className="checkbox"
        onChange={handleChange}
        type="checkbox"
      />
      <span className="checkbox-check"></span>
    </label>
  );
}
