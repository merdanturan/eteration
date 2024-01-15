import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: {},
    totalPrice: 0,
  }

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const itemId = action.payload.id;
      if (state.items[itemId]) {
        state.items[itemId] += 1;
      } else {
        state.items[itemId] = 1;
      }
      state.totalPrice += +action.payload.price;
    },
    removeItem: (state, action) => {
      const itemId = action.payload.id;
      if (state.items[itemId]) {
        state.items[itemId] -= 1;
        state.totalPrice -= +action.payload.price;
        if (state.items[itemId] === 0) {
          delete state.items[itemId];
        }
      }
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;
export const selectItems = state => state.cart.items;
export const selectTotalPrice = state => state.cart.totalPrice;
export default cartSlice.reducer;
