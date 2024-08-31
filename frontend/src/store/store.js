import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./Slices/themeSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    // other reducers
  },
});

export default store;
