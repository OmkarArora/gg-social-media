import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import authReducer from "../features/authentication/authSlice";
import postsReducer from "../features/posts/postsSlice";
import alertReducer from "../features/alert/alertSlice";
import navReducer from "../features/navbar/navSlice";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    posts: postsReducer,
    alert: alertReducer,
    nav: navReducer,
    user: userReducer
  },
});
