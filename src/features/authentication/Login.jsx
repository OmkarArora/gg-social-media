import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { loginUser } from "./authSlice";
import "./auth.css";

export const Login = () => {
  const dispatch = useDispatch();
  const { isUserLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email: "email", password: "password" }));
  };

  useEffect(() => {
    if (isUserLoggedIn) {
      navigate("/");
    }
  }, [isUserLoggedIn, navigate]);

  return (
    <div className="container-auth">
		Login
      <form className="form-login" onSubmit={onSubmit}>
        <input type="email" placeholder="email" />
        <input type="password" placeholder="password" />
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};
