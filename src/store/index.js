import { configureStore } from "@reduxjs/toolkit";
import wordsReducer from "./fetch-data";
import addWordsSlice from "./add";

const store = configureStore({
  reducer: {
    words: wordsReducer,
    addWordsSlice: addWordsSlice,
  },
});

export default store;
