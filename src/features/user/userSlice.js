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
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
