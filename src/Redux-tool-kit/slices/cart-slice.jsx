import { createSlice } from "@reduxjs/toolkit";
const initialState = JSON.parse(localStorage.getItem("cart")) || [];
export const cartSlice = createSlice({
  initialState,
  name: "cartSlice",
  reducers: {
    // Add Product
    addToCart: (state, action) => {
      const findProduct = state.find(
        (product) => product.id === action.payload.id
      );
      if (findProduct) {
        findProduct.quantity += 1;
      } else {
        const cloneProduct = { ...action.payload, quantity: 1 };
        state.push(cloneProduct);
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },

    // Delete Product
    deleteFromCart: (state, action) => {
      const newState = state.filter(
        (product) => product.id !== action.payload.id
      );
      localStorage.setItem("cart", JSON.stringify(newState));
      return newState;
    },

    //Clear Cart
    clearCart: (state, action) => {
      localStorage.removeItem("cart");
      return [];
    },

    //Handle Quantity
    updateQuantity: (state, action) => {
      const { id, type } = action.payload;
      const product = state.find((p) => p.id === id);
      if (product) {
        if (type === "increase") {
          product.quantity += 1;
        } else if (type === "decrease") {
          if (product.quantity > 1) {
            product.quantity -= 1;
          }
        }
      }
    },
  },
});

export const { addToCart, deleteFromCart, clearCart, updateQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
