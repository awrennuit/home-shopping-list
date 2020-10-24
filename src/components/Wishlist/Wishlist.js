///////////////////////////////////////
//    TURN INTO GENERAL COMPONENT    //
///////////////////////////////////////

import React, { useContext, useEffect, useState } from "react";
import AddItem from "../AddItem/AddItem";
import { Context } from "../App/App";
import HomeButton from "../HomeButton/HomeButton";
import WishlistItem from "./WishlistItem";

export default function Wishlist() {
  const { state } = useContext(Context);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (state.wishlist) setItems(Object.values(state.wishlist));
  }, [state.wishlist]);

  return (
    <>
      <HomeButton />
      {items.length > 0 ? (
        items.map((item, i) => (
          <div key={i}>
            <WishlistItem label={item} />
          </div>
        ))
      ) : (
        <p>Nothing on the list yet</p>
      )}
      <hr />
      <AddItem
        contextPath="SET_WISHLIST"
        dbUrl="wishlist/"
        stateLength="wishlist"
      />
    </>
  );
}
