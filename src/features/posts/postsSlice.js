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

export const fetchPostDetails = createAsyncThunk(
  "posts/fetchPostDetails",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND}/post-details/${postId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const likePost = createAsyncThunk(
  "posts/likePost",
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
  "posts/unlikePost",
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

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    status: "idle",
    error: null,
    posts: [],
    detailsPagePost: null,
    shouldUpdateFeedPost: false,
  },
  reducers: {
    setDetailsPagePost: (state, action) => {
      state.detailsPagePost = action.payload.detailsPagePost;
    },
    setUpdateFeedPostStatus: (state, action) => {
      state.shouldUpdateFeedPost = action.payload.updateStatus;
    },
    setDefaultPostsStatus: (state) => {
      state.posts = [];
      state.status = "idle";
      state.error = null;
    },
  },
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
    [fetchPostDetails.pending]: (state) => {
      state.status = "loading";
    },
    [fetchPostDetails.fulfilled]: (state, action) => {
      state.detailsPagePost = action.payload.post;
      state.status = "fulfilled";
    },
    [fetchPostDetails.rejected]: (state, action) => {
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
      state.posts = state.posts.map((post) =>
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
      state.posts = state.posts.map((post) =>
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
  },
});

export const { setDetailsPagePost, setUpdateFeedPostStatus, setDefaultPostsStatus } =
  postsSlice.actions;
export default postsSlice.reducer;
