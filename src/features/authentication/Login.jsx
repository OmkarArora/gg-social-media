import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { loginUser } from "./authSlice";
import { Button, Input } from "shoto-ui";
import "./auth.css";

export const Login = () => {
  const dispatch = useDispatch();
  const { isUserLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (isUserLoggedIn) {
      navigate("/");
    }
  }, [isUserLoggedIn, navigate]);

  return (
    <div className="container-auth">
      Login to gg
      <form className="form-login" onSubmit={onSubmit}>
        <Input
          type="text"
          label="Email or username"
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
          Log in
        </Button>
      </form>
    </div>
  );
};
