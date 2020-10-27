import React, { useContext } from "react";
import { Context } from "../App/App";
import GenericList from "../GenericList/GenericList";

export default function Wishlist() {
  const { state } = useContext(Context);

  return (
    <>
      <GenericList
        apiEndpoint={state.wishlist}
        contextPath="SET_WISHLIST"
        dbUrl="wishlist/"
        stateLength="wishlist"
      />
    </>
  );
}
