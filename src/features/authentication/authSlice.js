import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const refreshFromUsername = createAsyncThunk(
  "auth/refreshFromUsername",
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

export const updateUserDetails = createAsyncThunk(
  "auth/updateUserDetails",
  async ({ userUpdates, userId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND}/users/${userId}`,
        {
          userUpdates,
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const followUser = createAsyncThunk(
  "auth/followUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND}/users/follow`,
        {
          userId,
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const unfollowUser = createAsyncThunk(
  "auth/unfollowUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND}/users/unfollow`,
        {
          userId,
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

let login = JSON.parse(localStorage.getItem("ggLogin"));
let local_token = login?.token || null;
let local_userData = login?.userData || null;
let userLoginStatus = local_token ? true : false;

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "idle",
    error: null,
    isUserLoggedIn: userLoginStatus,
    token: local_token,
    userData: local_userData,
    shouldUpdatePost: false,
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
    setUserDetails: (state, action) => {
      state.userData = action.payload.userData;
    },
    setUpdatePostStatus: (state, action) => {
      state.shouldUpdatePost = action.payload.updateStatus;
    }
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
    [updateUserDetails.pending]: (state) => {
      state.status = "loading";
    },
    [updateUserDetails.fulfilled]: (state, action) => {
      state.userData = action.payload.user;
      if (localStorage) {
        let login = JSON.parse(localStorage.getItem("ggLogin"));
        login.userData = action.payload.user;
        localStorage.setItem("ggLogin", JSON.stringify(login));
      }
      state.status = "fulfilled";
    },
    [updateUserDetails.rejected]: (state, action) => {
      state.status = "error";
      if (action.payload && action.payload.errorMessage)
        state.error = action.payload.errorMessage;
      else state.error = "Something went wrong";
    },
    [followUser.pending]: (state) => {
      state.status = "loading";
    },
    [followUser.fulfilled]: (state, action) => {
      state.userData = action.payload.user;
      if (localStorage) {
        let login = JSON.parse(localStorage.getItem("ggLogin"));
        login.userData = action.payload.user;
        localStorage.setItem("ggLogin", JSON.stringify(login));
      }
      state.status = "fulfilled";
    },
    [unfollowUser.rejected]: (state, action) => {
      state.status = "error";
      if (action.payload && action.payload.errorMessage)
        state.error = action.payload.errorMessage;
      else state.error = "Something went wrong";
    },
    [unfollowUser.pending]: (state) => {
      state.status = "loading";
    },
    [unfollowUser.fulfilled]: (state, action) => {
      state.userData = action.payload.user;
      if (localStorage) {
        let login = JSON.parse(localStorage.getItem("ggLogin"));
        login.userData = action.payload.user;
        localStorage.setItem("ggLogin", JSON.stringify(login));
      }
      state.status = "fulfilled";
    },
    [followUser.rejected]: (state, action) => {
      state.status = "error";
      if (action.payload && action.payload.errorMessage)
        state.error = action.payload.errorMessage;
      else state.error = "Something went wrong";
    },
    [refreshFromUsername.pending]: (state) => {
      state.status = "loading";
    },
    [refreshFromUsername.fulfilled]: (state, action) => {
      state.userData = action.payload.user;
      state.status = "fulfilled";
    },
    [refreshFromUsername.rejected]: (state, action) => {
      state.status = "error";
      if (action.payload && action.payload.errorMessage)
        state.error = action.payload.errorMessage;
      else state.error = "Something went wrong";
    },
  },
});

export const { setLoginDetails, logoutUser, setUserDetails, setUpdatePostStatus } =
  authSlice.actions;
export default authSlice.reducer;
