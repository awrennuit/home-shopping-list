import React, { Fragment } from "react";
import "./Hub.css";
import Menu from "./Menu";

export default function Hub() {
  const menuItems = [
    { label: "Shopping List", url: "/shopping" },
    { label: "Recipes", url: "/recipes" },
    { label: "Wishlist", url: "/wishlist" },
  ];

  return (
    <div id="hub-wrapper">
      <p className="hub-heading">⋆｡*ﾟ✲**✲ﾟ*｡⋆</p>
      <h1>Household Hub</h1>
      <p className="hub-heading">⋆｡*ﾟ✲**✲ﾟ*｡⋆</p>
      {menuItems.map((link, i) => (
        <Fragment key={i}>
          <Menu label={link.label} url={link.url} />
        </Fragment>
      ))}
    </div>
  );
}
