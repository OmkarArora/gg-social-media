import "./header.css";
import { useSelector } from "react-redux";
import { Avatar, Button } from "shoto-ui";
import { Link } from "react-router-dom";
import { Logo } from "../../Logo/Logo";
import { useDispatch } from "react-redux";
import { fetchPosts } from "../posts/postsSlice";

export const Header = () => {
  const { userData: user, status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const refreshFeed = () => {
    dispatch(fetchPosts());
  };

  return (
    <header className="header">
      <Link to="/">
        <Logo />
      </Link>
      <div className="header-actions">
        {status !== "loading" && (
          <Button
            size="small"
            rounded
            bgColor="var(--dark-grey-color)"
            onClick={refreshFeed}
          >
            Refresh Feed
          </Button>
        )}
        <div className="avatar-custom">
          {user && (
            <Link to={`/${user.username}`} state={{ user }}>
              <Avatar
                src={user.profileImage ? user.profileImage : ""}
                alt={user.name}
                height="2rem"
                width="2rem"
                bgColor="yellow"
              />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
