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
    case `ADD_ITEM`:
      state.items.push(action.payload);
      return { ...state };
    case `REMOVE_ITEM`:
      return {
        ...state,
        items: state.items.filter((e) => e !== action.payload),
      };
    case `SET_ITEMS`:
      return { items: action.payload };
    default:
      return initialState;
  }
};

export default function App() {
  const [state, dispatch] = useReducer(contextReducer, initialState);

  useEffect(() => {
    db.ref(`items/`).once("value", (snap) => {
      dispatch({ type: `SET_ITEMS`, payload: snap.val() });
    });
  }, []);

  return (
    <Context.Provider value={{ state, dispatch }}>
      <ItemList />
      <AddItem />
    </Context.Provider>
  );
}
