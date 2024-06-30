import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchCocktails } from "../../store/cocktailSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import LazyLoad from "react-lazyload";
import "./CocktailDetail.scss";

const CocktailDetail: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const dispatch = useAppDispatch();
  const cocktail = useAppSelector((state) => (code ? state.cocktails.data[code] : undefined));
  const isLoading = useAppSelector((state) => state.cocktails.loading);
  const isError = useAppSelector((state) => state.cocktails.error);

  useEffect(() => {
    if (code && !cocktail) {
      dispatch(fetchCocktails(code));
    }
  }, [code, dispatch, cocktail]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {isError}</p>;
  }

  if (!cocktail) {
    return <p>No cocktail found.</p>;
  }

  const drink = cocktail[0];

  return (
    <div className="cocktail-detail">
      <div className="cocktail-detail__info">
        <h2>{drink.strDrink}</h2>
        <p>
          <strong>Category:</strong> {drink.strCategory}
        </p>
        <p>
          <strong>Type:</strong> {drink.strAlcoholic}
        </p>
        <p>
          <strong>Glass:</strong> {drink.strGlass}
        </p>
        <p>
          <strong>Instructions:</strong> {drink.strInstructions}
        </p>
        <h3>Ingredients:</h3>
        <ul>
          {Array.from({ length: 15 }, (_, i) => i + 1).map((i) => {
            const ingredient = drink[`strIngredient${i}`];
            const measure = drink[`strMeasure${i}`];
            return ingredient ? (
              <li key={i}>
                {measure} {ingredient}
              </li>
            ) : null;
          })}
        </ul>
      </div>
      <div className="cocktail-detail__image-wrapper">
        <LazyLoad height={250} offset={100} once>
          <img
            className="cocktail-detail__image"
            src={drink.strDrinkThumb}
            alt={drink.strDrink}
          />
        </LazyLoad>
      </div>
    </div>
  );
};

export default CocktailDetail;
