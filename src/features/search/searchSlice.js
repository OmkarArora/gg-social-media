import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const searchUser = createAsyncThunk(
  "search/searchUser",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND}/users/search`,
        {
			searchQuery,
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    status: "idle",
    error: null,
    searchResults: [],
  },
  reducers: {
  },
  extraReducers: {
    [searchUser.pending]: (state) => {
      state.status = "loading";
    },
    [searchUser.fulfilled]: (state, action) => {
      state.searchResults = action.payload.searchResults;
      state.status = "fulfilled";
    },
    [searchUser.rejected]: (state, action) => {
      state.status = "error";
      if (action.payload && action.payload.errorMessage)
        state.error = action.payload.errorMessage;
      else state.error = "Something went wrong";
    },
  },
});

export default searchSlice.reducer;
