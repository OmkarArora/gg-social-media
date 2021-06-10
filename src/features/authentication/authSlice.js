import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND}/users/login`,
      {
        email,
        password,
      }
    );
    return response.data;
  }
);

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ name, email, password }) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND}/users/signup`,
      {
        name,
        email,
        password,
      }
    );
    return response.data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "idle",
    error: null,
    isUserLoggedIn: false,
    token: null,
    userData: null,
  },
  reducers: {},
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.status = "loading";
    },
    [loginUser.fulfilled]: (state, action) => {
      state.userData = action.payload.user;
      state.token = action.payload.token;
      state.isUserLoggedIn = true;
      state.status = "fulfilled";
    },
    [loginUser.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [signupUser.pending]: (state) => {
      state.status = "loading";
    },
    [signupUser.fulfilled]: (state, action) => {
      state.userData = action.payload.user;
      state.token = action.payload.token;
      state.isUserLoggedIn = true;
      state.status = "fulfilled";
    },
    [signupUser.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
  },
});

// export const { userLoggedIn } = authSlice.actions;
export default authSlice.reducer;
