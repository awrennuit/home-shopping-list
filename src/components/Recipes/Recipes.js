import React, { Fragment, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../App/App";
import HomeButton from "../HomeButton/HomeButton";

export default function Recipes() {
  const history = useHistory();
  const { state } = useContext(Context);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (state.recipes) setRecipes(state.recipes);
  }, [state.recipes]);

  return (
    <>
      <HomeButton />
      <ul className="main-list">
        {/* have only keys map */}
        {/* click on key, push history to page, show ingredients */}
        {/* add new ingredient button */}
        {/* button to add all ingredients to shopping list */}
        {Object.keys(recipes).map((name, i) => (
          <Fragment key={i}>
            <li onClick={() => history.push(`/recipe/${name}`)}>{name}</li>
            {/* <ul>
              {Object.values(recipes[name]).map((ingredient, j) => (
                <li key={j}>{ingredient}</li>
              ))}
            </ul> */}
          </Fragment>
        ))}
      </ul>
      <hr />
      {/* on click go to new page to add recipe & ingredients */}
      {/* move to top? keep bot for consistency? */}
      <div className="add-btn-long-wrapper">
        <button className="add-btn-long" onClick={() => history.push("/add-recipe")}>
          New Recipe
        </button>
      </div>
    </>
  );
}
