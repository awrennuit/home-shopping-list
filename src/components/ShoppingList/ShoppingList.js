import React, { useContext } from "react";
import { Context } from "../App/App";
import GenericList from "../GenericList/GenericList";

export default function ShoppingList() {
  const { state } = useContext(Context);

  return (
    <>
      <GenericList
        apiEndpoint={state.shoppingList}
        contextPath="SET_SHOPPING_LIST"
        dbUrl="items/"
        stateLength="shoppingList"
      />
    </>
  );
}
