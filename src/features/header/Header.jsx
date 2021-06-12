import "./header.css";
import { Button } from "shoto-ui";
import { logoutUser } from "../authentication/authSlice";
import { useDispatch } from "react-redux";

export const Header = () => {
  const dispatch = useDispatch();

  return (
    <header className="header">
      <div>gg</div>
      <div>
        <Button rounded size="small" onClick={() => dispatch(logoutUser())}>
          Log Out
        </Button>
      </div>
    </header>
  );
};
