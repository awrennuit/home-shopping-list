import React, { useEffect, useReducer } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { db } from "../../firebase";
import Hub from "../Hub/Hub";
import ShoppingList from "../ShoppingList/ShoppingList";
import Recipes from "../Recipes/Recipes";
import "./App.css";

export const Context = React.createContext();

const initialState = {
  shoppingList: [],
  recipes: {},
};

const contextReducer = (state, action) => {
  switch (action.type) {
    case `SET_SHOPPING_LIST`:
      return { shoppingList: action.payload };
    case `SET_RECIPES`:
      return { recipes: action.payload };
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
    dispatch({ type: `SET_SHOPPING_LIST`, payload: payload });

    await db.ref(`recipes/`).once("value", (snap) => {
      payload = snap.val();
      delete payload[0];
    });
    dispatch({ type: `SET_RECIPES`, payload: payload });
  };

  return (
    <Context.Provider value={{ state, dispatch }}>
      <Router>
        <Route exact path="/" component={Hub} />
        <Route exact path="/shopping" component={ShoppingList} />
        <Route exact path="/recipes" component={Recipes} />
      </Router>
    </Context.Provider>
  );
}
