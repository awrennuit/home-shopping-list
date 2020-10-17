import React, { useContext, useEffect, useState } from "react";
import { Context } from "../App/App";
import Checkbox from "./Checkbox";

export default function ItemList() {
  const { state, dispatch } = useContext(Context);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (state.items) setItems(state.items);
  }, [state.items]);

  return (
    <div>
      {items.map((item, i) => (
        <div key={i}>
          <Checkbox label={item} />
        </div>
      ))}
    </div>
  );
}
