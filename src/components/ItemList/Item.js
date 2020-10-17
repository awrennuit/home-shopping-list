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
        dispatch({ type: `REMOVE_ITEM`, payload: props.label });
        db.ref(`items/${props.itemKey}`).remove();
      }, 2000);
    }
  }, [isChecked]);

  useEffect(() => {
    setIsChecked(false);
  }, [state.items]);

  const handleChange = () => {
    if (isChecked) {
      clearTimeout(timeout);
    }
    setIsChecked(!isChecked);
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
