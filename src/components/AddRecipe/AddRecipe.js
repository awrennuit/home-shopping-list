import React, { useEffect, useRef, useState } from "react";
import "./AddRecipe.css";
import HomeButton from "../HomeButton/HomeButton";

export default function AddRecipe() {
  const ingredientRef = useRef();
  const recipeRef = useRef();
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [recipeName, setRecipeName] = useState("");

  useEffect(() => recipeRef.current.focus(), []);

  const handleRecipeSubmittal = () => {
    // add recipe and ingredients to database
  };

  const removeIngredient = (item) => {
    setTimeout(() => {
      setIngredients((ingredients) => ingredients.filter((i) => i !== item));
    }, 2000);
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

  return (
    <>
      <HomeButton />
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
      {/* have output preview below with ACCEPT button? */}
      {/* also have DELETE button next to each ingredient? */}
      {/* or a "tap ingredient to remove" note? */}
      <div style={{ marginTop: "1rem" }}>
        <h1 style={{ marginBottom: "0.5rem", textAlign: "center" }}>
          {recipeName}
        </h1>
        <ul className="main-list">
          {ingredients.map((item, i) => (
            <li key={i} onClick={() => removeIngredient(item)}>
              {item}
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
