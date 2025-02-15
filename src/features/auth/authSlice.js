// features/auth/authSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./authService";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")),
  token: localStorage.getItem("authToken"),
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};
console.log(initialState.user);
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await loginUser(credentials);
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      return data;
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        status: error.status,
        data: error.data,
      });
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const data = await registerUser(userData);
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      return data;
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        status: error.status,
        data: error.data,
      });
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
    },
    updateUser(state, action) {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem("user", state.user);
    },
    loginAsVisitor: (state, action) => {
      state.user = action.payload;
      state.token = `visitor-${action.payload.id}`;
      localStorage.setItem("authToken", state.token);
      localStorage.setItem("user", state.user);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout, updateUser, updateAuthToken, loginAsVisitor } =
  authSlice.actions;
export default authSlice.reducer;
