import { useParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { fetchUserFromUsername } from "./userSlice";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./userSlice";
import { Avatar } from "shoto-ui";
import "./userProfile.css";

export const UserProfile = () => {
  const { username } = useParams();
  const { state } = useLocation();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  console.log({ user });

  useEffect(() => {
    if (!state) {
      dispatch(fetchUserFromUsername(username));
    } else {
      if (state.user) dispatch(setUser({ user: state.user }));
      else dispatch(fetchUserFromUsername(username));
    }
  }, [dispatch, state, username]);

  return (
    <div className="container-userProfile">
      {user && (
        <img src={user.bannerImage} alt="user banner" className="img-banner" />
      )}
      <div className="container-userInfo">
        <div className="container-avatar">
          <Avatar
            alt={user?.name}
            src={user?.profileImage}
            height="5rem"
            width="5rem"
          />
        </div>
        <div>{user?.name}</div>
        <div>@{user?.username}</div>
        <div>
          <div>{user?.location}</div>
          <div>{user?.birthDate}</div>
        </div>
        <div>
          <div>{user?.following} Following</div>
          <div>{user?.followers} Followers</div>
        </div>
        <div>
          <h3>Posts</h3>
        </div>
      </div>
    </div>
  );
};
