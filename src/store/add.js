import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addWords = createAsyncThunk(
  "words/addWords",
  async (newWords, { rejectWithValue }) => {
    try {
      const promises = newWords.map((item) =>
        //base url should be in .env file
        // call api in loop since mockapi doesn't accept array so i send word by word
        axios.post(
          "https://67880bd2c4a42c9161092912.mockapi.io/api/v1/words",
          item,
        ),
      );
      await Promise.all(promises);
      return newWords;
    } catch (error) {
      console.error("Error adding word:", error);
      return rejectWithValue(error.response?.data || "Error adding words");
    }
  },
);

const addWordsSlice = createSlice({
  name: "wordAddition",
  initialState: {
    words: [],
    keys: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addWords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addWords.fulfilled, (state, action) => {
        state.loading = false;
        state.words = [...state.words, ...action.payload];
      })
      .addCase(addWords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
      });
  },
});

export default addWordsSlice.reducer;
