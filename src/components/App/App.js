import React, { useEffect, useReducer } from "react";
import AddItem from "../AddItem/AddItem";
import ItemList from "../ItemList/ItemList";
import "./App.css";

export const Context = React.createContext();

const initialState = {
  items: [
    "Tofu",
    "Potatoes",
    "sööp lööps",
    "Almond Milk",
    "Socks That Match",
    "Googly Eyes",
  ],
};

const contextReducer = (state, action) => {
  switch (action.type) {
    case `ADD_ITEM`:
      state.items.push(action.payload);
      return { ...state };
    case `REMOVE_ITEM`:
      return {
        ...state,
        items: state.items.filter((e) => e !== action.payload),
      };
    case `SET_ITEM`:
      return { ...state, items: action.payload };
    default:
      return initialState;
  }
};

export default function App() {
  const [state, dispatch] = useReducer(contextReducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>
      <ItemList />
      <AddItem />
    </Context.Provider>
  );
}
