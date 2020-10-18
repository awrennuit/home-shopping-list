import React, { useContext, useEffect, useState } from "react";
import { Context } from "../App/App";
import Item from "./Item";

export default function ItemList() {
  const { state, dispatch } = useContext(Context);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (state.items) setItems(Object.values(state.items));
  }, [state.items]);

  return (
    <>
      {items.length > 0 ? (
        items.map((item, i) => (
          <div key={i}>
            <Item label={item} />
          </div>
        ))
      ) : (
        <p>Nothing on the list yet</p>
      )}
      <hr />
    </>
  );
}
