import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { loginUser } from "./authSlice";
import { Button, Input } from "shoto-ui";
import { Link } from "react-router-dom";
import { showAlert } from "../alert/alertSlice";
import { LoadingModal } from "../loader/LoadingModal/LoadingModal";
import "./auth.css";

export const Login = () => {
  const dispatch = useDispatch();
  const { isUserLoggedIn, status, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    let emailRegex = new RegExp(
      /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/
    );
    if (!emailRegex.test(email)) {
      return dispatch(showAlert({ type: "error", data: "Invalid email" }));
    }
    dispatch(loginUser({ email, password }));
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
      <header>Login to gg</header>
      <small>
        New here? <Link to="/signup">Sign Up</Link>
      </small>
      <form className="form-login" onSubmit={onSubmit}>
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
        <Button type="submit" rounded size="large">
          Log In
        </Button>
      </form>
      {status === "loading" && <LoadingModal />}
    </div>
  );
};
