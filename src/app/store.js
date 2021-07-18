import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authentication/authSlice";
import postsReducer from "../features/posts/postsSlice";
import alertReducer from "../features/alert/alertSlice";
import navReducer from "../features/navbar/navSlice";
import userReducer from "../features/user/userSlice";
import searchReducer from "../features/search/searchSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    alert: alertReducer,
    nav: navReducer,
    user: userReducer,
    search: searchReducer
  },
});
