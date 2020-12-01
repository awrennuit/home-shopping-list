import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { db } from "../../firebase";
import "./AddRecipe.css";

export default function AddRecipe() {
  const history = useHistory();
  const ingredientRef = useRef();
  const recipeRef = useRef();
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [recipeName, setRecipeName] = useState("");

  useEffect(() => recipeRef.current.focus(), []);

  const handleRecipeSubmittal = () => {
    updateDatabase();
    // update recipe context
    setIngredients([]);
    setNewIngredient("");
    setRecipeName("");
    recipeRef.current.focus();
  };

  const submitNewIngredient = (e) => {
    e.preventDefault();
    if (ingredients.length === 0) {
      setIngredients([newIngredient]);
    } else {
      setIngredients((ingredients) => [...ingredients, newIngredient]);
    }
    setNewIngredient("");
    ingredientRef.current.focus();
  };

  const updateDatabase = async () => {
    await db.ref(`recipes/`).update({
      [recipeName]: ingredients,
    });
  };

  return (
    <>
      <div>
        <button id="back-btn" onClick={() => history.push("/recipes")}>
          BACK
        </button>
      </div>
      <h1>New Recipe</h1>
      <label>Recipe Name</label>
      <input
        className="add-input"
        onChange={(e) => setRecipeName(e.target.value)}
        placeholder="recipe name"
        ref={recipeRef}
        type="text"
        value={recipeName}
      />

      <form id="recipe-form" onSubmit={(e) => submitNewIngredient(e)}>
        <label>New Ingredient</label>
        <input
          className="add-input"
          onChange={(e) => setNewIngredient(e.target.value)}
          placeholder="new ingredient"
          ref={ingredientRef}
          type="text"
          value={newIngredient}
        />
        <button className="add-btn" type="submit">
          +
        </button>
      </form>

      <hr />
      <div style={{ marginTop: "1rem" }}>
        <h1 style={{ marginBottom: "0.5rem", textAlign: "center" }}>
          {recipeName}
        </h1>
        <ul className="main-list">
          {ingredients.map((item, i) => (
            <li
              className="delete-btn-li"
              key={i}
              onClick={() =>
                setIngredients((ingredients) =>
                  ingredients.filter((i) => i !== item)
                )}
            >
              {item}
              <button className="delete-btn">X</button>
            </li>
          ))}
        </ul>
      </div>
      <button
        className="add-btn"
        onClick={handleRecipeSubmittal}
        style={{ display: "block", margin: "0 auto" }}
      >
        ✓
      </button>
    </>
  );
}
