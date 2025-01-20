import { configureStore } from "@reduxjs/toolkit";
import wordReducer from "./slice";

const store = configureStore({
  reducer: {
    word: wordReducer,
  },
});

export default store;
