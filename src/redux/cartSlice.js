// redux/cartSlice.js
// Manages all cart state: items, quantities, totals

import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Array of { id, title, price, thumbnail, quantity, category }
  },
  reducers: {
    // Add product to cart or increment quantity if already exists
    addToCart(state, action) {
      const product = action.payload;
      const existing = state.items.find((item) => item.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },

    // Remove a product entirely from the cart
    removeFromCart(state, action) {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },

    // Increase quantity of a specific item by 1
    incrementQuantity(state, action) {
      const id = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) item.quantity += 1;
    },

    // Decrease quantity; minimum is 1
    decrementQuantity(state, action) {
      const id = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item && item.quantity > 1) item.quantity -= 1;
    },

    // Clear the entire cart (used after checkout)
    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
export const selectCartTotal = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

export default cartSlice.reducer;
