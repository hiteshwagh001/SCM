import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./Slices/themeSlice";
import userReducer from "./Slices/userSlice"

const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,

    // other reducers
  },
});

export default store;
