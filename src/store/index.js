import { configureStore } from "@reduxjs/toolkit";
import wordsReducer from "./fetch-data";
import addWordsSlice from "./add";
import deleteWordsSlice from "./delete";

const store = configureStore({
  reducer: {
    words: wordsReducer,
    addWords: addWordsSlice,
    deleteWords: deleteWordsSlice,
  },
});

export default store;
