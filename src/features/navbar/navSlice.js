import { createSlice } from "@reduxjs/toolkit";

export const navSlice = createSlice({
  name: "nav",
  initialState: {
    activeTab: "home"
  },
  reducers: {
    setActiveNavTab: (state, action) => {
		state.activeTab = action.payload.activeTab;
	}
  },
});

export const { setActiveNavTab } = navSlice.actions;
export default navSlice.reducer;
