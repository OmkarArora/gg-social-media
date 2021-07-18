import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Routes, Route } from "react-router";
import {
  Login,
  Signup,
  Navbar,
  Sidenav,
  Feed,
  Alert,
  Search,
  Notifications,
  Header,
  UserProfile,
  PostPage,
  NewPostModal,
  setLoginDetails,
  logoutUser,
  fetchUserFromUsername,
} from "./features";
import axios from "axios";
import PrivateRoute from "./PrivateRoute";
import { setupAuthHeaderForServiceCalls } from "./helper";
import "./App.css";

function App() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isNewPostModalVisible, setNewPostModalVisibility] = useState(false);

  // useEffect(() => {
  //   if (!isUserLoggedIn) {
  //     navigate("/login");
  //   }
  // }, [isUserLoggedIn, navigate]);

  useEffect(() => {
    let login = JSON.parse(localStorage.getItem("ggLogin"));
    if (login) {
      dispatch(
        setLoginDetails({ token: login.token, userData: login.userData })
      );
      dispatch(fetchUserFromUsername(login.userData.username));
    }
  }, [dispatch]);

  useEffect(() => {
    setupAuthHeaderForServiceCalls(token);
  }, [token]);

  useEffect(() => {
    // setupAuthExceptionHandler
    const UNAUTHORIZED = 401;
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error?.response?.status === UNAUTHORIZED) {
          dispatch(logoutUser());
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );
  }, [dispatch, navigate]);

  return (
    <div className="App">
      <div className="container-header">
        <Header />
      </div>
      <div className="container-sidenav">
        <Sidenav setNewPostModalVisibility={setNewPostModalVisibility} />
      </div>
      <main className="main">
        <Routes>
          <PrivateRoute
            path="/"
            element={
              <Feed setNewPostModalVisibility={setNewPostModalVisibility} />
            }
          />
          <PrivateRoute path="/search" element={<Search />} />
          <PrivateRoute
            path="/notifications"
            element={
              <Notifications
                setNewPostModalVisibility={setNewPostModalVisibility}
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/post/:postId" element={<PostPage />} />
          <Route path="/:username" element={<UserProfile />} />
        </Routes>
        <Alert />
        {isNewPostModalVisible && (
          <NewPostModal onClose={() => setNewPostModalVisibility(false)} />
        )}
      </main>
      <div className="container-footer">
        <Navbar />
      </div>
    </div>
  );
}

export default App;
