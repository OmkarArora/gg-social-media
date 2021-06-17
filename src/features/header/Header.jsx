import "./header.css";
import {  useSelector } from "react-redux";
import { Avatar } from "shoto-ui";
import {Link} from "react-router-dom";

export const Header = () => {
  const { userData: user } = useSelector((state) => state.auth);

  return (
    <header className="header">
      <div>gg</div>
      <div>
        {/* <Button rounded size="small" onClick={() => dispatch(logoutUser())}>
          Log Out
        </Button> */}
        <Link to={`/${user.username}`} state={{ user }}>
          <Avatar src={user.profileImage} alt={`${user.name}`} height="2rem" width="2rem"/>
        </Link>
      </div>
    </header>
  );
};
