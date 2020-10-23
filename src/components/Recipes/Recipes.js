import React, { Fragment, useContext, useEffect, useState } from "react";
import { Context } from "../App/App";
import HomeButton from "../HomeButton/HomeButton";

export default function Recipes() {
  const { state } = useContext(Context);

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (state.recipes) setRecipes(state.recipes);
  }, [state.recipes]);

  return (
    <>
      <HomeButton />
      <ul>
        {Object.keys(recipes).map((name, i) => (
          <Fragment key={i}>
            <li>{name}</li>
            <ul>
              {Object.values(recipes[name]).map((ingredient, j) => (
                <li key={j}>{ingredient}</li>
              ))}
            </ul>
          </Fragment>
        ))}
      </ul>
      <hr />
      <p>PUT BTN HERE</p>
    </>
  );
}
