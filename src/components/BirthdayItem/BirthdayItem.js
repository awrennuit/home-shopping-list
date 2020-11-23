import React, { useEffect, useState } from "react";
import "../BirthdayTracker/BirthdayTracker.css";

export default function BirthdayItem(props) {
  const [birthdayClass, setBirthdayClass] = useState("hide-content");
  const [viewMonth, setViewMonth] = useState(false);

  useEffect(() => {
    viewMonth
      ? setBirthdayClass("view-content")
      : setBirthdayClass("hide-content");
  }, [viewMonth]);

  const renderBirthdayData = (birthdayData) => {
    let output = [];
    for (let value of birthdayData) {
      output.push(
        <li className="birthday-item" key={value.name}>
          {value.name}:&nbsp;
          <span>{props.viewZodiac ? value.zodiac : value.date}</span>
        </li>
      );
    }
    return output;
  };

  return (
    <>
      <p className="birthday-month" onClick={() => setViewMonth(!viewMonth)}>
        {props.month[0]}
      </p>
      <ul className={birthdayClass}>{renderBirthdayData(props.month[1])}</ul>
    </>
  );
}
