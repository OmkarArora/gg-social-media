import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { signupUser } from "./authSlice";
import { Button, Input } from "shoto-ui";
import { Link } from "react-router-dom";
import { showAlert } from "../alert/alertSlice";
import { LoadingModal } from "../loader/LoadingModal/LoadingModal";
import "./auth.css";

export const Signup = () => {
  const dispatch = useDispatch();
  const { isUserLoggedIn, status, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    let emailRegex = new RegExp(
      /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/
    );
    if (!emailRegex.test(email)) {
      return dispatch(showAlert({ type: "error", data: "Invalid email" }));
    }

    // Password Checks
    if (password.length < 8) {
      return dispatch(
        showAlert({
          type: "error",
          data: "Password must be atleast 8 characters long",
        })
      );
    }
    if (password !== confirmPassword) {
      return dispatch(
        showAlert({
          type: "error",
          data: "Password and cofirm password must match",
        })
      );
    }
    let passwordRegex = new RegExp(
      /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/
    );
    if (!passwordRegex.test(password)) {
      return dispatch(
        showAlert({
          type: "error",
          data: "Password must contain atleast a letter, a number, and a special character",
        })
      );
    }
    dispatch(signupUser({ name, email, password }));
  };

  useEffect(() => {
    if (isUserLoggedIn) {
      navigate("/");
    }
  }, [isUserLoggedIn, navigate]);

  useEffect(() => {
    if (status === "error" && error) {
      dispatch(showAlert({ type: "error", data: error }));
    }
  }, [error, status, dispatch]);

  return (
    <div className="container-auth">
      <header>Sign Up for gg</header>
      <small>
        Already a member? <Link to="/login">Log In</Link>
      </small>
      <form className="form-login" onSubmit={onSubmit}>
        <Input
          type="text"
          label="Name"
          required
          activeColor="#db2777"
          textColor="#fff"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="text"
          label="Email"
          required
          activeColor="#db2777"
          textColor="#fff"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Password"
          type="password"
          required
          activeColor="#db2777"
          textColor="#fff"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          label="Confirm Password"
          type="password"
          required
          activeColor="#db2777"
          textColor="#fff"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button type="submit" rounded size="large">
          Sign Up
        </Button>
      </form>
      {status === "loading" && <LoadingModal />}
    </div>
  );
};
