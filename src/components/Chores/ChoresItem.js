///////////////////////////////////////
//    TURN INTO GENERAL COMPONENT    //
///////////////////////////////////////

import React, { useContext, useEffect, useRef, useState } from "react";
import { db } from "../../firebase";
import { Context } from "../App/App";
import "../ShoppingList/ShoppingItem.css";

export default function ChoresItem(props) {
  const { state, dispatch } = useContext(Context);
  const [isChecked, setIsChecked] = useState(false);
  let timeout = useRef(null);

  useEffect(() => {
    if (isChecked) {
      timeout.current = setTimeout(() => {
        try {
          removeItemFromDatabase();
        } catch (error) {
          alert(`Try again - something went wrong.`);
        }
      }, 2000);
    }
    // eslint-disable-next-line
  }, [isChecked]);

  useEffect(() => setIsChecked(false), [state.chores]);

  const handleChange = () => {
    if (isChecked) {
      clearTimeout(timeout.current);
    }
    setIsChecked(!isChecked);
  };

  const refreshApi = async () => {
    let payload = "";
    await db.ref(`chores/`).once("value", (snap) => {
      payload = snap.val();
      delete payload[0];
    });
    dispatch({ type: `SET_CHORES`, payload: payload });
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
    await db.ref(`chores/${keyToRemove}`).remove();
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
