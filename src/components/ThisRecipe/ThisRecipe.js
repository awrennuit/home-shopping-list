import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { db } from "../../firebase";
import { Context } from "../App/App";
import ThisRecipeItem from "../ThisRecipeItem/ThisRecipeItem";
import Toast from "../Toast/Toast";

export default function ThisRecipe() {
  const { state } = useContext(Context);
  const history = useHistory();
  const params = useParams();
  const recipeName = `${params.id.charAt(0).toUpperCase()}${params.id
    .slice(1)
    .replace(/-/g, " ")}`;
  const [ingredientList, setIngredientList] = useState([]);
  const [ingredientsToAdd, setIngredientsToAdd] = useState([]);
  const [isToast, setIsToast] = useState(false);
  const [resetChecks, setResetChecks] = useState(false);

  useEffect(() => {
    if (state.thisRecipe.length > 0) setIngredientList(state.thisRecipe);
  }, [state.thisRecipe]);

  useEffect(() => {
    if (resetChecks && ingredientsToAdd.length === 0) {
      setResetChecks(false);
    }
    // eslint-disable-next-line
  }, [ingredientsToAdd]);

  const addIngredientToArray = (item) => {
    if (ingredientsToAdd.length === 0) setIngredientsToAdd(item);
    setIngredientsToAdd([...ingredientsToAdd, item]);
  };

  const addIngredientToDatabase = () => {
    for (let item of ingredientsToAdd) {
      updateDatabase(item);
    }
    showToast();
    setIngredientsToAdd([]);
    setResetChecks(true);
  };

  const removeIngredientFromArray = (item) =>
    setIngredientsToAdd(ingredientsToAdd.filter((i) => i !== item));

  const showToast = () => {
    setIsToast(true);
    setTimeout(() => {
      setIsToast(false);
    }, 2000);
  };

  const updateDatabase = (itemToAdd) => {
    const randomId = Math.random().toString(36).substr(2, 13);
    db.ref(`shopping`).update({
      [Object.values(state.shoppingList).length + randomId]: itemToAdd,
    });
  };

  return (
    <>
      <div>
        <button id="back-btn" onClick={() => history.push("/recipes")}>
          BACK
        </button>
      </div>
      <h2>{recipeName}</h2>
      {ingredientList.map((item, i) => (
        <div key={i}>
          <ThisRecipeItem
            label={item}
            addToArray={addIngredientToArray}
            removeFromArray={removeIngredientFromArray}
            resetChecks={resetChecks}
          />
        </div>
      ))}
      <div style={{ textAlign: "center" }}>
        <button className="add-btn-long" onClick={addIngredientToDatabase}>
          Add to List
        </button>
        <Toast shown={isToast} />
      </div>
    </>
  );
}
