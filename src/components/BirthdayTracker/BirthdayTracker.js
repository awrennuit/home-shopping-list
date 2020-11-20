import React, { useEffect, useState } from "react";
import "./BirthdayTracker.css";
import HomeButton from "../HomeButton/HomeButton";
import BirthdayItem from "../BirthdayItem/BirthdayItem";

export default function BirthdayTracker() {
  const monthList = [
    {
      January: [
        {
          birthday: "May 22",
          name: "Sammi",
          zodiac: "Gemini",
        },
        {
          birthday: "August 13",
          name: "Logan",
          zodiac: "Leo",
        },
      ],
    },
    {
      February: [
        {
          birthday: "Making it up",
          name: "Peter",
          zodiac: "idk",
        },
        {
          birthday: "September 27",
          name: "Kelly",
          zodiac: "libra",
        },
      ],
    },
  ];

  const [viewZodiac, setViewZodiac] = useState(false);

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
      {monthList.map((month, i) => (
        <div key={i} style={{ marginTop: "1.5rem" }}>
          <BirthdayItem month={month} viewZodiac={viewZodiac} />
        </div>
      ))}
      {/* button to add new person to month */}
    </>
  );
}
