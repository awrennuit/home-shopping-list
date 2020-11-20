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
    for (let person of birthdayData) {
      for (let value of person) {
        output.push(
          <li className="birthday-item" key={value.name}>
            {value.name}:&nbsp;
            <span>{props.viewZodiac ? value.zodiac : value.birthday}</span>
          </li>
        );
      }
    }
    return output;
  };
  return (
    <>
      <p className="birthday-month" onClick={() => setViewMonth(!viewMonth)}>
        {Object.keys(props.month)}
      </p>
      <ul className={birthdayClass}>
        {renderBirthdayData(Object.values(props.month))}
      </ul>
    </>
  );
}
