import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices";

const store = configureStore({
  reducer: {
    product: cartReducer,
    // Add other reducers here if needed
  },
});

export default store;
