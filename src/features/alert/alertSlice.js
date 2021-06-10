import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "alert",
  initialState: {
    openStatus: false,
	type: null,
	data: null
  },
  reducers: {
	  showAlert: (state, action) => {
		  state.openStatus = true;
		  state.type = action.payload.type;
		  state.data = action.payload.data;
	  },
	  closeAlert: (state, action) => {
		  state.openStatus = false;
		  state.type = null;
		  state.data= null;
	  }
  },
});

export const { showAlert, closeAlert } = authSlice.actions;
export default authSlice.reducer;
