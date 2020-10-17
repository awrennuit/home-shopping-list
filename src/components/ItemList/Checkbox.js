import React, { useContext } from "react";
import { Context } from "../App/App";

export default function Checkbox(props) {
  const { state, dispatch } = useContext(Context);
  const handleChange = (item) => dispatch({ type: `REMOVE_ITEM`, payload: item });

  return (
    <label>
      <input
        type="checkbox"
        checked={false}
        onChange={() => handleChange(props.label)}
      />
      {props.label}
    </label>
  );
}
