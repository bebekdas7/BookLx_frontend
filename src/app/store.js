import { configureStore } from "@reduxjs/toolkit";
import addToCartReducer from "../features/addToCart.js";

export default configureStore({
  reducer: {
    cart: addToCartReducer,
  },
});
