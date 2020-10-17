import React, { useState } from "react";

export default function Checkbox(props) {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <label>
      <input
        type="checkbox"
        value={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />
      {props.label}
    </label>
  );
}
