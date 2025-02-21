import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { makeMove } from "./matchService";

const initialState = {
  currentMatch: null,
  loading: false,
  error: null,
};

export const sendMove = createAsyncThunk(
  "match/sendMove",
  async (moveData, { rejectWithValue }) => {
    try {
      return await makeMove(moveData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const matchSlice = createSlice({
  name: "match",
  initialState,
  reducers: {
    resetMatchState: (state) => {
      state.currentMatch = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMove.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMove.fulfilled, (state, action) => {
        state.loading = false;
        state.currentMatch = action.payload;
      })
      .addCase(sendMove.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetMatchState } = matchSlice.actions;
export default matchSlice.reducer;
