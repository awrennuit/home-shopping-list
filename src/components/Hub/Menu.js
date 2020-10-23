import React from "react";
import { useHistory } from "react-router-dom";
import './Hub.css';

export default function Menu(props) {
  const history = useHistory();
  return (
    <div>
      <button className="menu-btn" onClick={() => history.push(props.url)}>{props.component}</button>
    </div>
  );
}
