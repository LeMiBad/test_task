import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getCocktails, Cocktail } from "../api/cocktailApi";

interface FetchCocktailsPayload {
  code: string;
  cocktails: Cocktail[];
}

export const fetchCocktails = createAsyncThunk<FetchCocktailsPayload, string>(
  "cocktails/fetchCocktails",
  async (code: string) => {
    const cocktails = await getCocktails(code);
    return { code, cocktails };
  },
);

interface CocktailState {
  data: {
    [key: string]: Cocktail[];
  };
  loading: boolean;
  error: string | null;
}

const initialState: CocktailState = {
  data: {},
  loading: false,
  error: null,
};

const cocktailSlice = createSlice({
  name: "cocktails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCocktails.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchCocktails.fulfilled,
        (state, action: PayloadAction<FetchCocktailsPayload>) => {
          state.loading = false;
          state.data[action.payload.code] = action.payload.cocktails;
        },
      )
      .addCase(fetchCocktails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export default cocktailSlice.reducer;
