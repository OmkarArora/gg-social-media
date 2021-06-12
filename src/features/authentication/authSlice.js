import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND}/users/login`,
        {
          email,
          password,
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND}/users/signup`,
        {
          name,
          email,
          password,
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
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
  reducers: {
    setLoginDetails: (state, action) => {
      state.userData = action.payload.userData;
      state.token = action.payload.token;
      state.isUserLoggedIn = true;
    },
    logoutUser: (state, action) => {
      localStorage?.removeItem("ggLogin");
      state.token = null;
      state.userData = null;
      state.isUserLoggedIn = false;
    },
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.status = "loading";
    },
    [loginUser.fulfilled]: (state, action) => {
      state.userData = action.payload.user;
      state.token = action.payload.token;
      state.isUserLoggedIn = true;
      state.error = null;
      state.status = "fulfilled";

      localStorage?.setItem(
        "ggLogin",
        JSON.stringify({ userData: state.userData, token: state.token })
      );
    },
    [loginUser.rejected]: (state, action) => {
      state.status = "error";
      if (action.payload && action.payload.errorMessage)
        state.error = action.payload.errorMessage;
      else state.error = "Something went wrong";
    },
    [signupUser.pending]: (state) => {
      state.status = "loading";
    },
    [signupUser.fulfilled]: (state, action) => {
      state.userData = action.payload.user;
      state.token = action.payload.token;
      state.isUserLoggedIn = true;
      state.error = null;
      state.status = "fulfilled";

      localStorage?.setItem(
        "ggLogin",
        JSON.stringify({ userData: state.userData, token: state.token })
      );
    },
    [signupUser.rejected]: (state, action) => {
      state.status = "error";
      if (action.payload && action.payload.errorMessage)
        state.error = action.payload.errorMessage;
      else state.error = "Something went wrong";
    },
  },
});

export const { setLoginDetails, logoutUser } = authSlice.actions;
export default authSlice.reducer;
