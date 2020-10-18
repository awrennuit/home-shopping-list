import React, { useEffect, useReducer } from "react";
import { db } from "../../firebase";
import AddItem from "../AddItem/AddItem";
import ItemList from "../ItemList/ItemList";
import "./App.css";

export const Context = React.createContext();

const initialState = {
  items: [],
};

const contextReducer = (state, action) => {
  switch (action.type) {
    case `SET_ITEMS`:
      return { items: action.payload };
    default:
      return initialState;
  }
};

export default function App() {
  const [state, dispatch] = useReducer(contextReducer, initialState);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let payload = "";
    await db.ref(`items/`).once("value", (snap) => {
      payload = snap.val();
      delete payload[0];
    });
    dispatch({ type: `SET_ITEMS`, payload: payload });
  };

  return (
    <Context.Provider value={{ state, dispatch }}>
      <ItemList />
      <AddItem />
    </Context.Provider>
  );
}
