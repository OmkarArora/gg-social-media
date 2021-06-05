import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Routes, Route } from "react-router";
import "./App.css";
import { Login } from "./features/authentication/Login";
import { Counter } from "./features/counter/Counter";
import { Navbar } from "./features/navbar/Navbar";
import { Sidenav } from "./features/navbar/Sidenav";
import { Feed } from "./features/posts/Feed";

function App() {
  const { isUserLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isUserLoggedIn) {
      navigate("/login");
    }
  }, [isUserLoggedIn, navigate]);
  return (
    <div className="App">
      <div className="container-header">header</div>
      <div className="container-sidenav">
        <Sidenav />
      </div>
      <main className="main">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <div className="container-footer">
        <Navbar />
      </div>
    </div>
  );
}

export default App;
