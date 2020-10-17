import React, { useContext, useEffect, useState } from "react";
import { Context } from "../App/App";
import "./Checkbox.css";

export default function Checkbox(props) {
  const { state, dispatch } = useContext(Context);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (isChecked) {
      // if timeout is happening, re-add item if item unchecked
      // or add undo?
      setTimeout(() => {
        dispatch({ type: `REMOVE_ITEM`, payload: props.label });
      }, 2000);
    }
  }, [isChecked]);

  useEffect(() => {
    setIsChecked(false);
  }, [state.items]);

  return (
    <label className={`checkbox-container ${isChecked ? "checked" : "unchecked"}`}>
      {props.label}
      <input
        checked={isChecked}
        className="checkbox"
        onChange={() => setIsChecked(!isChecked)}
        type="checkbox"
      />
      <span className="checkbox-check"></span>
    </label>
  );
}
