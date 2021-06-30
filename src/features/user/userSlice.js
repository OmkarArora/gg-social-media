import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserFromUsername = createAsyncThunk(
  "user/fetchUserFromUsername",
  async (username, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND}/users/username`,
        {
          username,
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    status: "idle",
    error: null,
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
    addPost: (state, action) => {
      state.user.posts = [action.payload.post, ...state.user.posts];
    },
  },
  extraReducers: {
    [fetchUserFromUsername.pending]: (state) => {
      state.status = "loading";
    },
    [fetchUserFromUsername.fulfilled]: (state, action) => {
      state.user = action.payload.user;
      if (localStorage) {
        let login = JSON.parse(localStorage.getItem("ggLogin"));
        login.userData = action.payload.user;
        localStorage.setItem("ggLogin", JSON.stringify(login));
      }
      state.status = "fulfilled";
    },
    [fetchUserFromUsername.rejected]: (state, action) => {
      state.status = "error";
      if (action.payload && action.payload.errorMessage)
        state.error = action.payload.errorMessage;
      else state.error = "Something went wrong";
    },
  },
});

export const { setUser, addPost } = userSlice.actions;
export default userSlice.reducer;
