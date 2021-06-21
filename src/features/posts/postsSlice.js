import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND}/users/feed`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const sendPost = createAsyncThunk(
  "auth/sendPost",
  async (post, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND}/posts`,
        {
          ...post,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    status: "idle",
    error: null,
    posts: [],
  },
  reducers: {},
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts = action.payload.feed;
      state.status = "fulfilled";
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = "error";
      if (action.payload && action.payload.errorMessage)
        state.error = action.payload.errorMessage;
      else state.error = "Something went wrong";
    },
    [sendPost.pending]: (state) => {
      state.status = "loading";
    },
    [sendPost.fulfilled]: (state, action) => {
      state.posts = [action.payload.post, ...state.posts];
      state.status = "fulfilled";
    },
    [sendPost.rejected]: (state, action) => {
      state.status = "error";
      if (action.payload && action.payload.errorMessage)
        state.error = action.payload.errorMessage;
      else state.error = "Something went wrong";
    },
  },
});

// export const {  } = postsSlice.actions;
export default postsSlice.reducer;
