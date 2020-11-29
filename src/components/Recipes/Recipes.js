import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { db } from "../../firebase";
import { Context } from "../App/App";
import HomeButton from "../HomeButton/HomeButton";

export default function Recipes() {
  const history = useHistory();
  const { state, dispatch } = useContext(Context);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (state.recipes) setRecipes(state.recipes);
  }, [state.recipes]);

  const pushHistoryToThisRecipe = async (recipe) => {
    const urlParam = recipe.replace(/\s+/g, "-").toLowerCase();
    let payload = [];
    await db.ref(`recipes/${recipe}`).once("value", (snap) => {
      payload = snap.val();
    });
    dispatch({ type: `SET_THIS_RECIPE`, payload: payload });
    history.push(`/recipes/${urlParam}`);
  };

  return (
    <>
      <HomeButton />
      <ul className="main-list">
        {/* button to add all ingredients to shopping list? */}
        {Object.keys(recipes).map((name, i) => (
          <li key={i} onClick={() => pushHistoryToThisRecipe(name)}>
            {name}
          </li>
        ))}
      </ul>
      <hr />
      <div className="add-btn-long-wrapper">
        <button
          className="add-btn-long"
          onClick={() => history.push("/recipes/add")}
        >
          New Recipe
        </button>
      </div>
    </>
  );
}
