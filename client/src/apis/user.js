import { createAsyncThunk, createAction, createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "./status";
import axios from "axios";
export const clearError = createAction("clearError");
export const clearMessage = createAction("clearMessage");

const UserSlice = createSlice({
  name: "User",
  initialState: {
    user: null,
    status: STATUSES.SUCCESS,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUser.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.status = STATUSES.SUCCESS;
        state.user = action.payload;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.status = STATUSES.FAIL;
        state.error = action.payload;
        state.user = null;
      })

      .addCase(clearError, (state) => {
        state.error = null;
      })
      .addCase(clearMessage, (state) => {
        state.message = null;
      });
  },
});

export default UserSlice.reducer;

export const loadUser = createAsyncThunk("user/loadUser", async () => {
  const { data } = await axios.get("/api/v1/user");
  return data.user;
});
