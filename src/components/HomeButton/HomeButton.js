import React from "react";
import { useHistory } from "react-router-dom";
import "./HomeButton.css";

export default function HomeButton() {
  const history = useHistory();

  return (
    <div>
      <button id="home-btn" onClick={() => history.push("/hub")}>
        HOME
      </button>
    </div>
  );
}
