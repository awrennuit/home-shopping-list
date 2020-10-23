import React, { useContext, useEffect, useState } from "react";
import AddItem from "../AddItem/AddItem";
import { Context } from "../App/App";
import HomeButton from "../HomeButton/HomeButton";
import ShoppingItem from "./ShoppingItem";

export default function ShoppingList() {
  const { state } = useContext(Context);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (state.shoppingList) setItems(Object.values(state.shoppingList));
  }, [state.shoppingList]);

  return (
    <>
      <HomeButton />
      {items.length > 0 ? (
        items.map((item, i) => (
          <div key={i}>
            <ShoppingItem label={item} />
          </div>
        ))
      ) : (
        <p>Nothing on the list yet</p>
      )}
      <hr />
      <AddItem
        contextPath="SET_SHOPPING_LIST"
        dbUrl="items/"
        stateLength="shoppingList"
      />
    </>
  );
}
