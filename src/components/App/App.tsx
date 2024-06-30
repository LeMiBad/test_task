import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CocktailList from "../CocktailList/CocktailList";
import CocktailDetail from "../CocktailDetail/CocktailDetail";
import NotFound from "../NotFound/NotFound";
import "./App.scss";

const App: React.FC = () => {
  return (
    <div className="app-container">
      <nav>
        <CocktailList />
      </nav>
      <div className="content">
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/cocktail/margarita" replace />}
          />
          <Route path="/cocktail/:code" element={<CocktailDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
