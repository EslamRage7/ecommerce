import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("heart")) || [];
export const heartSlice = createSlice({
  initialState,
  name: "heartSlice",
  reducers: {
    addFavorite: (state, action) => {
      state.push(action.payload);
      localStorage.setItem("heart", JSON.stringify(state));
    },
    deleteFromFavorite: (state, action) => {
      const newState = state.filter(
        (product) => product.id !== action.payload.id
      );
      localStorage.setItem("heart", JSON.stringify(newState));
      return newState;
    },
    clearFavorite: (state, action) => {
      localStorage.removeItem("heart");
      return [];
    },
  },
});
export const { addFavorite, deleteFromFavorite, clearFavorite } =
  heartSlice.actions;
export default heartSlice.reducer;
