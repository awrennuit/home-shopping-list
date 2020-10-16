import React, { useState } from "react";

export default function ItemList() {
  // hold api data
  const [item, setItem] = useState({ name: "Tofu", isChecked: false });

  return (
    <div>
      {/* map through data, create this for each */}
      <label>
        <input
          type="checkbox"
          value={item.isChecked}
          onChange={setItem({ ...item, isChecked: !item.isChecked })}
        />
        {item.name}
      </label>
    </div>
  );
}
