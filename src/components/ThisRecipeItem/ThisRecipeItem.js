import React, { useEffect, useState } from "react";

export default function ThisRecipeItem(props) {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (isChecked) {
      props.addToArray(props.label);
    } else {
      props.removeFromArray(props.label);
    }
    // eslint-disable-next-line
  }, [isChecked]);

  useEffect(() => {
    if (props.resetChecks) setIsChecked(false);
  }, [props.resetChecks]);

  return (
    <label className="checkbox-container">
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
