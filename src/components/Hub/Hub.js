import React, { Fragment } from "react";
import "./Hub.css";
import Menu from "./Menu";

export default function Hub() {
  const menuItems = [
    { component: "ShoppingList", url: "/shopping" },
    { component: "Recipes", url: "/recipes" },
  ];

  return (
    <div id="hub-wrapper">
      <p className="hub-heading">⋆｡*ﾟ✲**✲ﾟ*｡⋆</p>
      <h1>Household Hub</h1>
      <p className="hub-heading">⋆｡*ﾟ✲**✲ﾟ*｡⋆</p>
      {menuItems.map((link, i) => (
        <Fragment key={i}>
          <Menu component={link.component} url={link.url} />
        </Fragment>
      ))}
    </div>
  );
}
