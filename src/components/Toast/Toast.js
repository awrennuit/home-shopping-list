import React from "react";
import "./Toast.css";

export default function Toast(props) {
  return (
    <div id="toast" className={props.shown ? 'toast-shown' : 'toast-hidden'}>
      <p>Added!</p>
    </div>
  );
}
