import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import { STATUSES } from "./status";

export const clearError = createAction("clearError");
export const clearMessage = createAction("clearMessage");

const loginSlice = createSlice({
  name: "login",
  initialState: {
    message: null,
    error: null,
    user: null,
    isAuthenticate: false,
    status: STATUSES.SUCCESS,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = STATUSES.LOADING;
        state.isAuthenticate = false;
        state.message = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = STATUSES.SUCCESS;
        state.isAuthenticate = true;
        state.message = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = STATUSES.FAIL;
        state.isAuthenticate = false;
        state.error = action.payload;
        state.message = null;
      })
      .addCase(logoutUser.pending, (state) => {
        state.status = STATUSES.LOADING;
        state.isAuthenticate = true;
        state.message = null;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.status = STATUSES.SUCCESS;
        state.isAuthenticate = false;
        state.message = action.payload;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = STATUSES.FAIL;
        state.isAuthenticate = true;
        state.error = action.payload;
        state.message = null;
      })
      .addCase(myProfile.pending, (state) => {
        state.status = STATUSES.LOADING;
        state.isAuthenticate = false;
      })
      .addCase(myProfile.fulfilled, (state, action) => {
        state.status = STATUSES.SUCCESS;
        state.user = action.payload;
        state.isAuthenticate = true;
      })
      .addCase(myProfile.rejected, (state, action) => {
        state.status = STATUSES.FAIL;
        state.error = action.payload;
        state.user = null;
        state.isAuthenticate = false;
      })
      .addCase(updateData.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(updateData.fulfilled, (state, action) => {
        state.status = STATUSES.SUCCESS;
        state.message = action.payload;
      })
      .addCase(updateData.rejected, (state, action) => {
        state.status = STATUSES.LOADING;
        state.error = action.payload;
      })
      .addCase(contact.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(contact.fulfilled, (state, action) => {
        state.status = STATUSES.SUCCESS;
        state.message = action.payload;
      })
      .addCase(contact.rejected, (state, action) => {
        state.error = action.payload;
        state.message = null;
      })
      .addCase(clearError, (state) => {
        state.error = null;
      })
      .addCase(clearMessage, (state) => {
        state.message = null;
      });
  },
});

export default loginSlice.reducer;

export const logoutUser = createAsyncThunk("user/logout", async () => {
  try {
    const { data } = await axios.get(`/api/v1/logout`);
    return data.message;
  } catch (error) {
    return error.response.data.message;
  }
});
export const loginUser = createAsyncThunk(
  "user/login",
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `/api/v1/login`,
        {
          email: user.email,
          password: user.password,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      return data.message;
    } catch (error) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data.message);
    }
  }
);

export const myProfile = createAsyncThunk("user/me", async () => {
  const { data } = await axios.get("/api/v1/me");
  return data.user;
});

export const updateData = createAsyncThunk(
  "/admin/update",
  async (name, email, password, about, skills) => {
    try {
      const { data } = await axios.put(
        "/api/v1/admin/update",
        {
          name,
          email,
          password,
          about,
          skills,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      return data.message;
    } catch (error) {
      return error.response.data.message;
    }
  }
);
export const contact = createAsyncThunk("/contact", async (info) => {
  try {
    const { data } = await axios.post(
      "/api/v1/contact",
      {
        name: info.name,
        email: info.email,
        message: info.msg,
      },
      { headers: { "Content-Type": "application/json" } }
    );
    return data.message;
  } catch (error) {
    return error.response.data.message;
  }
});
