import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addWords, deleteWord, fetchWords, updateWord } from "./api";

export const fetchWordsAsync = createAsyncThunk(
  "words/fetchWords",
  async () => {
    const response = await fetchWords();
    return response;
  },
);

export const updateWordAsync = createAsyncThunk(
  "words/updateWord",
  async () => {
    const response = await updateWord();
    return response;
  },
);
export const deleteWordAsync = createAsyncThunk(
  "words/fetchUsers",
  async () => {
    const response = await deleteWord();
    return response;
  },
);
export const addWordsAsync = createAsyncThunk("words/addWords", async () => {
  const response = await addWords();
  return response;
});

const wordSlice = createSlice({
  name: "word",
  initialState: {
    words: [],
    loading: false,
    error: null,
  },
  reducers: {
    addWord: (state, action) => {
      state.words.push(action.payload);
    },
    removeWord: (state, action) => {
      state.users = state.words.filter((user) => user.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWordsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWordsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.words = action.payload;
      })
      .addCase(fetchWordsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addWord, removeWord } = wordSlice.actions;

export default wordSlice.reducer;
