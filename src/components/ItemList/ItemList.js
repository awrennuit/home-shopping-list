import React, { useState } from "react";
import Checkbox from "./Checkbox";

export default function ItemList() {
  // hold api data
  const [items, setItems] = useState([
    "Tofu",
    "Potatoes",
    "sööp lööps",
    "Almond Milk",
    "Socks That Match",
  ]);

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
