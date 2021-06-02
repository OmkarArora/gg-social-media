import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({email, password}) => {
    // const response = await
    console.log(email, password);
    return {user: { userId: "12sas"},  token: "12sd212" };
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
  },
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
  },
});

export const { userLoggedIn } = authSlice.actions;
export default authSlice.reducer;
