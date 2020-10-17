import React, { useContext, useEffect, useState } from "react";
import { db } from "../../firebase";
import { Context } from "../App/App";
import Item from "./Item";

export default function ItemList() {
  const { state, dispatch } = useContext(Context);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (state.items) setItems(state.items);
  }, [state.items]);

  return (
    <>
      {Object.entries(items).map((item, i) => (
        <div key={i}>
          <Item label={item[1]} itemKey={item[0]} />
        </div>
      ))}
      <hr />
    </>
  );
}
