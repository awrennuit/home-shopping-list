import React, { useEffect, useReducer } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { db } from "../../firebase";
import "./App.css";
import AddRecipe from "../AddRecipe/AddRecipe";
import Hub from "../Hub/Hub";
import Recipes from "../Recipes/Recipes";
import ShoppingList from "../ShoppingList/ShoppingList";
import Wishlist from "../Wishlist/Wishlist";

export const Context = React.createContext();

const initialState = {
  shoppingList: [],
  recipes: {},
  wishlist: [],
};

const contextReducer = (state, action) => {
  switch (action.type) {
    case `SET_SHOPPING_LIST`:
      return { ...state, shoppingList: action.payload };
    case `SET_RECIPES`:
      return { ...state, recipes: action.payload };
    case `SET_WISHLIST`:
      return { ...state, wishlist: action.payload };
    default:
      return initialState;
  }
};

export default function App() {
  const [state, dispatch] = useReducer(contextReducer, initialState);

  useEffect(() => {
    fetchData();
  }, []);

  // turn into loop to reuse code
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

    await db.ref(`wishlist/`).once("value", (snap) => {
      payload = snap.val();
      delete payload[0];
    });
    dispatch({ type: `SET_WISHLIST`, payload: payload });
  };

  return (
    <Context.Provider value={{ state, dispatch }}>
      <Router>
        <Route exact path="/" component={Hub} />
        <Route exact path="/add-recipe" component={AddRecipe} />
        <Route exact path="/recipes" component={Recipes} />
        <Route exact path="/shopping" component={ShoppingList} />
        <Route exact path="/wishlist" component={Wishlist} />
      </Router>
    </Context.Provider>
  );
}
