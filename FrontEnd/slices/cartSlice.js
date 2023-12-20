import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    cartAdd: (state, action) => {
      const existingItem = state.find((item) => item.id === action.payload.id);

      if (existingItem) {
        if (existingItem.avaiableQuantity > existingItem.quantity) {
          existingItem.quantity += 1;
        } else {
          
        }
      } else {
        state.push({
          id: action.payload.id,
          brand: action.payload.brand,
          description: action.payload.description,
          image: action.payload.image,
          price: action.payload.price,
          title: action.payload.title,
          avaiableQuantity: action.payload.quantity,
          quantity: 1,
        });
      }
    },
    cartRemove: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    increaseCartItemQuantity: (state, action) => {
      const itemToIncrease = state.find((item) => item.id === action.payload.id);

      if (itemToIncrease) {
        itemToIncrease.quantity += 1;
      }
    },
    decreaseCartItemQuantity: (state, action) => {
      const itemToDecrease = state.find((item) => item.id === action.payload.id);

      if (itemToDecrease && itemToDecrease.quantity > 1) {
        itemToDecrease.quantity -= 1;
      }
    },
    emptyCart: (state) => {
      state.splice(0, state.length);
    },
  },
});

export const {
  cartAdd,
  cartRemove,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
  emptyCart,
} = cartSlice.actions;

export default cartSlice.reducer;
