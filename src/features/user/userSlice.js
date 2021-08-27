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

export const likePost = createAsyncThunk(
  "user/likePost",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND}/posts/like`,
        {
          postId,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const unlikePost = createAsyncThunk(
  "user/unlikePost",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND}/posts/unlike`,
        {
          postId,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletPost",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND}/posts/${postId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
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
      state.status = "fulfilled";
    },
    [fetchUserFromUsername.rejected]: (state, action) => {
      state.status = "error";
      if (action.payload && action.payload.errorMessage)
        state.error = action.payload.errorMessage;
      else state.error = "Something went wrong";
    },
    [likePost.pending]: (state) => {
      state.status = "loading";
    },
    [likePost.fulfilled]: (state, action) => {
      const updatedPost = action.payload.post;
      state.user.posts = state.user.posts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      );
      state.status = "fulfilled";
    },
    [likePost.rejected]: (state, action) => {
      state.status = "error";
      if (action.payload && action.payload.errorMessage)
        state.error = action.payload.errorMessage;
      else state.error = "Something went wrong";
    },
    [unlikePost.pending]: (state) => {
      state.status = "loading";
    },
    [unlikePost.fulfilled]: (state, action) => {
      const updatedPost = action.payload.post;
      state.user.posts = state.user.posts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      );
      state.status = "fulfilled";
    },
    [unlikePost.rejected]: (state, action) => {
      state.status = "error";
      if (action.payload && action.payload.errorMessage)
        state.error = action.payload.errorMessage;
      else state.error = "Something went wrong";
    },
    [deletePost.pending]: (state) => {
      state.status = "loading";
    },
    [deletePost.fulfilled]: (state, action) => {
      const deletedPost = action.payload.post;
      state.user.posts = state.user.posts.filter((post) => deletedPost._id !== post._id);
      state.status = "fulfilled";
    },
    [deletePost.rejected]: (state, action) => {
      state.status = "error";
      if (action.payload && action.payload.errorMessage)
        state.error = action.payload.errorMessage;
      else state.error = "Something went wrong";
    },
  },
});

export const { setUser, addPost } = userSlice.actions;
export default userSlice.reducer;
