import React, { useContext, useEffect, useState } from "react";
import "./BirthdayTracker.css";
import HomeButton from "../HomeButton/HomeButton";
import BirthdayItem from "../BirthdayItem/BirthdayItem";
import { Context } from "../App/App";

export default function BirthdayTracker() {
  const { state } = useContext(Context);
  const [monthList, setMonthList] = useState([]);
  const [viewZodiac, setViewZodiac] = useState(false);

  useEffect(() => {
    if (state.birthdays.length > 0) {
      const allMonths = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      let birthdays = Object.assign({}, state.birthdays);
      for (let month of Object.keys(state.birthdays)) {
        switch (month) {
          case month:
            const keyToReplace = birthdays[month];
            delete birthdays[month];
            birthdays[allMonths[month - 1]] = keyToReplace;
            break;
          default:
            break;
        }
      }
      setMonthList(birthdays);
    }
  }, [state.birthdays]);

  return (
    <>
      <HomeButton />
      <div className="add-btn-long-wrapper">
        <button
          className="add-btn-long"
          onClick={() => setViewZodiac(!viewZodiac)}
          style={{ display: "block", margin: "0 auto" }}
        >
          View {viewZodiac ? "Birthdays?" : "Zodiac?"}
        </button>
      </div>
      {Object.entries(monthList).map((item, i) => (
        <div key={i} style={{ marginTop: "1.5rem" }}>
          <BirthdayItem month={item} viewZodiac={viewZodiac} />
        </div>
      ))}
      {/* button to add new person to month */}
    </>
  );
}
