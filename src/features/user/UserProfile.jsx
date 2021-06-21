import { useParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { addPost, fetchUserFromUsername } from "./userSlice";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./userSlice";
import { Avatar, Button } from "shoto-ui";
import { logoutUser } from "../authentication/authSlice";
import { PostCard } from "../posts/PostCard/PostCard";
import "./userProfile.css";

export const UserProfile = () => {
  const { username } = useParams();
  const { state } = useLocation();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { posts: feed } = useSelector((state) => state.posts);

  useEffect(() => {
    if (!state) {
      dispatch(fetchUserFromUsername(username));
    } else {
      if (state.user) dispatch(setUser({ user: state.user }));
      else dispatch(fetchUserFromUsername(username));
    }
  }, [dispatch, state, username]);

  useEffect(() => {
    if (user && feed.length > 0) {
      let postPresent = false;
      for (let i = 0; i < user.posts.length; i++) {
        if (user.posts[0]._id === feed[0]._id) {
          postPresent = true;
          break;
        }
      }
      if (!postPresent && feed[0].author._id === user._id) {
        dispatch(addPost({ post: feed[0] }));
      }
    }
  }, [feed, user, dispatch]);

  return (
    <div className="container-userProfile">
      {user && user.bannerImage && (
        <img src={user.bannerImage} alt="user banner" className="img-banner" />
      )}
      {user && !user.bannerImage && (
        <div className="banner-placeholder">{user.name}</div>
      )}
      <div className="container-userInfo">
        <div className="profile-toprow">
          <div className="container-avatar">
            <Avatar
              alt={user?.name}
              src={user && user.profileImage ? user.profileImage : ""}
              height="5rem"
              width="5rem"
            />
          </div>
          <Button rounded size="medium" onClick={() => dispatch(logoutUser())}>
            Log Out
          </Button>
        </div>

        <div className="profile-name">{user?.name}</div>
        <div className="profile-username text-grey">@{user?.username}</div>
        <div>
          <div>{user?.location}</div>
          <div>{user?.birthDate}</div>
        </div>
        <div className="profile-followDetails">
          <div>
            {user?.following.length}{" "}
            <span className="text-grey">Following</span>
          </div>
          <div>
            {user?.followers.length}{" "}
            <span className="text-grey">Followers</span>
          </div>
        </div>
      </div>

      <div>
        {user && user.posts.length > 0 && (
          <div className="posts-list">
            {user.posts &&
              user.posts.length > 0 &&
              user.posts.map((post) => <PostCard key={post._id} post={post} />)}
          </div>
        )}
      </div>
    </div>
  );
};
