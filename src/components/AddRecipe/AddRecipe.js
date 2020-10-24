import React, { useEffect, useRef, useState } from "react";

export default function AddRecipe() {
  const ingredientRef = useRef();
  const recipeRef = useRef();
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [recipeName, setRecipeName] = useState("");

  useEffect(() => recipeRef.current.focus(), []);

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
      <h1>New Recipe</h1>
      <label>Name</label>
      <input
        onChange={(e) => setRecipeName(e.target.value)}
        placeholder="recipe name"
        ref={recipeRef}
        type="text"
        value={recipeName}
      />

      <form onSubmit={(e) => submitNewIngredient(e)}>
        <p>Ingredients</p>
        <input
          onChange={(e) => setNewIngredient(e.target.value)}
          placeholder="ingredient"
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
      <div style={{marginTop:"1rem"}}>
        <h1 style={{textAlign:"center"}}>{recipeName}</h1>
        <ul className="main-list">
          {ingredients.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
