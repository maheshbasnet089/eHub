import { configureStore } from "@reduxjs/toolkit";
import auth from "./authSlice";
import activateSlice from "./activateSlice";

export const store = configureStore({
  reducer: {
    auth,
    activateSlice,
  },
});
