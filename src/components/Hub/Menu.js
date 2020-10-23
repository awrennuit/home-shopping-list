import React from "react";
import { useHistory } from "react-router-dom";

export default function Menu(props) {
  const history = useHistory();
  return (
    <div>
      <p onClick={() => history.push(props.url)}>{props.component}</p>
    </div>
  );
}
