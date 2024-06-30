import React from "react";
import { NavLink } from "react-router-dom";
import "./CocktailList.scss";

const cocktailCodes = ["margarita", "mojito", "a1", "kir"];

const CocktailList: React.FC = () => {
  return (
    <nav className="cocktail-list">
      <ul>
        {cocktailCodes.map((code) => (
          <li key={code}>
            <NavLink
              to={`/cocktail/${code}`}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {code.charAt(0).toUpperCase() + code.slice(1)}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CocktailList;
