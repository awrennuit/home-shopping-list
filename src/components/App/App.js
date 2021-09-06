import React, { useEffect, useReducer } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { db, getCurrentUser } from "../../firebase";
import "./App.css";
import AddRecipe from "../AddRecipe/AddRecipe";
import BirthdayTracker from "../BirthdayTracker/BirthdayTracker";
import Chores from "../Chores/Chores";
import Hub from "../Hub/Hub";
import Recipes from "../Recipes/Recipes";
import ShoppingList from "../ShoppingList/ShoppingList";
import ThisRecipe from "../ThisRecipe/ThisRecipe";
import Wishlist from "../Wishlist/Wishlist";
import Login from "../Login/Login";

export const Context = React.createContext();

const initialState = {
  birthdays: [],
  chores: [],
  recipes: {},
  shoppingList: [],
  thisRecipe: [],
  wishlist: [],
  user: {},
};

const contextReducer = (state, action) => {
  switch (action.type) {
    case `SET_BIRTHDAYS`:
      return { ...state, birthdays: action.payload };
    case `SET_CHORES`:
      return { ...state, chores: action.payload };
    case `SET_RECIPES`:
      return { ...state, recipes: action.payload };
    case `SET_SHOPPING_LIST`:
      return { ...state, shoppingList: action.payload };
    case `SET_THIS_RECIPE`:
      return { ...state, thisRecipe: action.payload };
    case `SET_WISHLIST`:
      return { ...state, wishlist: action.payload };
    case `SET_USER`:
      return { ...state, user: action.payload };
    case `UNSET_USER`:
      return { ...state, user: {} };
    default:
      return initialState;
  }
};

export default function App() {
  const [state, dispatch] = useReducer(contextReducer, initialState);

  useEffect(() => {
    fetchData();
  }, [state.user]);

  const fetchData = async () => {
    if (state.user || localStorage.getItem("user")) {
      const dataToStore = [
        { url: "birthdays/", type: "SET_BIRTHDAYS" },
        { url: "chores/", type: "SET_CHORES" },
        { url: "recipes/", type: "SET_RECIPES" },
        { url: "shopping/", type: "SET_SHOPPING_LIST" },
        { url: "wishlist/", type: "SET_WISHLIST" },
      ];

      for (let data of dataToStore) {
        let payload = "";
        await db.ref(data.url).once("value", (snap) => {
          payload = snap.val();
          delete payload[0];
        });
        dispatch({ type: data.type, payload: payload });
      }
    }
  };

  useEffect(() => {
    getCurrentUser().then((user) => {
      if (user) {
        dispatch({ type: `SET_USER`, payload: user.email });
      }
    });
  }, [dispatch]);

  return (
    <Context.Provider value={{ state, dispatch }}>
      <Router>
        <Route exact path="/" component={Login} />
        <Route exact path="/hub" component={Hub} />
        <Route exact path="/birthdays" component={BirthdayTracker} />
        <Route exact path="/chores" component={Chores} />
        <Route exact path="/recipes" component={Recipes} />
        <Route exact path="/recipes/:id" component={ThisRecipe} />
        <Route exact path="/recipe/add" component={AddRecipe} />
        <Route exact path="/shopping" component={ShoppingList} />
        <Route exact path="/wishlist" component={Wishlist} />
      </Router>
    </Context.Provider>
  );
}
