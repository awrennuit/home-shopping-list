import React, { useContext } from "react";
import { Context } from "../App/App";
import GenericList from "../GenericList/GenericList";

export default function Chores() {
  const { state } = useContext(Context);

  return (
    <>
      <GenericList
        apiEndpoint={state.chores}
        contextPath="SET_CHORES"
        dbUrl="chores/"
        stateLength="chores"
      />
    </>
  );
}
