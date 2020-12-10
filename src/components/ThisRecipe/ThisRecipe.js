import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { db } from "../../firebase";
import { Context } from "../App/App";
import ThisRecipeItem from "../ThisRecipeItem/ThisRecipeItem";
import Toast from "../Toast/Toast";

export default function ThisRecipe() {
  const { dispatch, state } = useContext(Context);
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
    refreshApi();
    showToast();
    setIngredientsToAdd([]);
    setResetChecks(true);
  };

  const refreshApi = async () => {
    let payload = "";
    await db.ref(`shopping/`).once("value", (snap) => {
      payload = snap.val();
      delete payload[0];
    });
    dispatch({ type: `SET_SHOPPING_LIST`, payload: payload });
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
      {/* re-GET ingredients on page refresh */}
      <div>
        <button id="back-btn" onClick={() => history.push("/recipes")}>
          BACK
        </button>
      </div>
      <h2 style={{ marginBottom: "1rem", textAlign: "center" }}>
        {recipeName}
      </h2>
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
      <hr />
      <div style={{ textAlign: "center" }}>
        <button className="add-btn-long" onClick={addIngredientToDatabase}>
          Add to List
        </button>
        <Toast shown={isToast} />
      </div>
    </>
  );
}
