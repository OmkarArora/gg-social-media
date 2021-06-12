import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Routes, Route } from "react-router";
import "./App.css";
import { Login } from "./features/authentication/Login";
import { Signup } from "./features/authentication/Signup";
import { Counter } from "./features/counter/Counter";
import { Navbar } from "./features/navbar/Navbar";
import { Sidenav } from "./features/navbar/Sidenav";
import { Feed } from "./features/posts/Feed";
import { Alert } from "./features/alert/Alert";
import {
  setLoginDetails,
  logoutUser,
} from "./features/authentication/authSlice";
import axios from "axios";
import { Search } from "./features/search/Search";
import { Notifications } from "./features/notifications/Notifications";
import { Header } from "./features/header/Header";
import PrivateRoute from "./PrivateRoute";

function App() {
  const { isUserLoggedIn, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserLoggedIn) {
      navigate("/login");
    }
  }, [isUserLoggedIn, navigate]);

  useEffect(() => {
    let login = JSON.parse(localStorage.getItem("ggLogin"));
    if (login) {
      dispatch(
        setLoginDetails({ token: login.token, userData: login.userData })
      );
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

  function setupAuthHeaderForServiceCalls(token) {
    if (token) {
      return (axios.defaults.headers.common["Authorization"] = token);
    }
    delete axios.defaults.headers.common["Authorization"];
  }

  return (
    <div className="App">
      <div className="container-header">
        <Header />
      </div>
      <div className="container-sidenav">
        <Sidenav />
      </div>
      <main className="main">
        <Routes>
          <PrivateRoute path="/" element={<Feed />} />
          <PrivateRoute path="/search" element={<Search />} />
          <PrivateRoute path="/notifications" element={<Notifications />} />
          <PrivateRoute path="/counter" element={<Counter />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Alert />
      </main>
      <div className="container-footer">
        <Navbar />
      </div>
    </div>
  );
}

export default App;
