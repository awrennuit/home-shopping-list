///////////////////////////////////////
//    TURN INTO GENERAL COMPONENT    //
///////////////////////////////////////

import React, { useContext, useEffect, useState } from "react";
import AddItem from "../AddItem/AddItem";
import { Context } from "../App/App";
import HomeButton from "../HomeButton/HomeButton";
import ChoresItem from "./ChoresItem";

export default function Chores() {
  const { state } = useContext(Context);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (state.chores) setItems(Object.values(state.chores));
  }, [state.chores]);

  return (
    <>
      <HomeButton />
      {items.length > 0 ? (
        items.map((item, i) => (
          <div key={i}>
            <ChoresItem label={item} />
          </div>
        ))
      ) : (
        <p>Nothing on the list yet</p>
      )}
      <hr />
      <AddItem contextPath="SET_CHORES" dbUrl="chores/" stateLength="chores" />
    </>
  );
}
