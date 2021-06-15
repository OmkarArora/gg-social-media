import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  // const response = await axios.get(
  //   "https://social-media-server.tanaypratap.repl.co/posts"
  // );
  // console.log(response.data);
  //   return response.data;
  return {
    posts: [
      {
        _id: "post1",
        likes: 20,
        content: {
          text: "A for apple",
          images: [],
        },
        author: {
          _id: "user1",
          name: "Dave",
          profileImage: "https://randomuser.me/api/portraits/men/75.jpg",
        },
		postDate: "2021-04-20T09:26:08.568+00:00"
      },
      {
        _id: "post2",
        likes: 10,
        content: {
          text: "B for BALL 😁",
          images: [],
        },
        author: {
          _id: "user2",
          name: "Mya",
          profileImage: "https://randomuser.me/api/portraits/women/70.jpg",
        },
		postDate: "2021-04-20T09:25:06.855+00:00"
      },
    ],
  };
});

export const sendPost = createAsyncThunk(
  "auth/sendPost",
  async (post, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND}/posts`,
        {
          ...post
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
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
      state.posts = action.payload.posts;
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
