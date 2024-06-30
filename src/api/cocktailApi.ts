import axios from "axios";

const COCKTAIL_API_URL =
  "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

export interface Cocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strInstructions: string;
  strCategory: string;
  strAlcoholic: string;
  strGlass: string;
  [key: string]: string | undefined;
}

export const getCocktails = async (code: string): Promise<Cocktail[]> => {
  const response = await axios.get(`${COCKTAIL_API_URL}${code}`);
  return response.data.drinks;
};
