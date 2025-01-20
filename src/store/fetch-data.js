import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { formatNullValue, isRecentlyAdded, getTime } from "../utils/dateUtils";
import { toast } from "react-custom-alert";

export const keys = [
  { field: "id" },
  { field: "Keyword", editable: true },
  {
    field: "Describtion",
    valueFormatter: (p) => formatNullValue(p.value),
    editable: true,
  },
  {
    field: "ConcurrencyStamp",
    editable: true,
    valueFormatter: (p) => formatNullValue(p.value),
  },
  { field: "CreationTime", valueFormatter: (p) => formatNullValue(p.value) },
  {
    field: "LastModificationTime",
    valueFormatter: (p) => formatNullValue(p.value),
  },
  {
    field: "LastModifierId",
    valueFormatter: (p) => formatNullValue(p.value),
  },
  { field: "IsEntryAdded", valueFormatter: (p) => formatNullValue(p.value) },
  { field: "RecentlyAdded", valueFormatter: (p) => formatNullValue(p.value) },
];
export const fetchWords = createAsyncThunk("words/fetchWords", async () => {
  const response = await axios.get(
    // process.env.REACT_APP_API_URL,
    "https://67880bd2c4a42c9161092912.mockapi.io/api/v1/words",
  );

  return response.data.map((word) => ({
    ...word,
    RecentlyAdded: isRecentlyAdded(word.CreationTime),
  }));
});

export const updateWord = createAsyncThunk(
  "words/updateWord",
  async (updatedWord, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        //  `${process.env.REACT_APP_API_URL}/${updatedWord.id}`,
        `https://67880bd2c4a42c9161092912.mockapi.io/api/v1/words/${updatedWord.id}`,
        { ...updatedWord, LastModificationTime: getTime(new Date()) },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error updating word");
    }
  },
);

const initialState = {
  words: [],
  keys: [],
  loading: true,
  status: true,
  error: null,
};

const wordsSlice = createSlice({
  name: "words",
  initialState,
  reducers: {
    removeWord: (state, action) => {
      state.words = state.words.filter((word) => word.id != action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWords.fulfilled, (state, action) => {
        state.words = action.payload;
        state.loading = false;
      })
      .addCase(fetchWords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch words.";
      })
      .addCase(updateWord.pending, (state) => {
        state.status = null;
      })
      .addCase(updateWord.fulfilled, (state, action) => {
        const updatedWord = action.payload;
        state.words = state.words.map((word) =>
          word.id === updatedWord.id ? updatedWord : word,
        );
        state.status = true;
        toast.success("Word updated successfully!");
      })
      .addCase(updateWord.rejected, (state, action) => {
        state.status = false;
        state.error = action.payload || "Error updating word";
        toast.error("Error updating word");
      });
  },
});

export const { removeWord } = wordsSlice.actions;

export default wordsSlice.reducer;
