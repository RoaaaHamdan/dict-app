import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-custom-alert";

export const deleteWord = createAsyncThunk(
  "wordDeletion/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `https://67880bd2c4a42c9161092912.mockapi.io/api/v1/words/${id}`,
      );
      return response.data;
    } catch (error) {
      toast.error("Error deleting word:", error);

      return rejectWithValue(
        error.response?.data || error.message || "Error deleting word",
      );
    }
  },
);

const wordDeletionSlice = createSlice({
  name: "wordDeletion",
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteWord.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteWord.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteWord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
        state.success = false;
      });
  },
});

export default wordDeletionSlice.reducer;
