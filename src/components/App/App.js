import React from "react";
import AddItem from "../AddItem/AddItem";
import ItemList from "../ItemList/ItemList";
import "./App.css";

export default function App() {
  return (
    <div>
      <ItemList />
      <AddItem />
    </div>
  );
}
