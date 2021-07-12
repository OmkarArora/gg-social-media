import { useSelector } from "react-redux";
import { Logo } from "../../../Logo/Logo";
import { Navbar } from "./Navbar";
import { Avatar, Button } from "shoto-ui";
import { Link } from "react-router-dom";
import { getProfileImage } from "../../../helper";

export const Sidenav = ({ setNewPostModalVisibility }) => {
  const { userData: user, isUserLoggedIn } = useSelector((state) => state.auth);

  return (
    <div className="sidenav">
      <div>
        <Logo />
        <Navbar />
        {isUserLoggedIn && (
          <div className="container-post-button">
            <Button
              rounded
              size="large"
              onClick={() => setNewPostModalVisibility(true)}
            >
              New Post
            </Button>
          </div>
        )}
      </div>

      {user && (
        <Link to={`/${user.username}`} state={{ user }}>
          <div className="container-profile-button">
            <Avatar
              alt={user?.name}
              src={getProfileImage(user)}
              height="2.5rem"
              width="2.5rem"
              key={user && user._id}
            />
            <div>{user?.name}</div>
          </div>
        </Link>
      )}
    </div>
  );
};
