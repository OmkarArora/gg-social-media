import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { addPost, fetchUserFromUsername } from "./userSlice";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./userSlice";
import { Avatar, Button } from "shoto-ui";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { RiCake2Line, RiCalendar2Line } from "react-icons/ri";
import { BsLink45Deg } from "react-icons/bs";
import { logoutUser, unfollowUser, followUser } from "../authentication/authSlice";
import { PostCard } from "../posts/PostCard/PostCard";
import { UserEditModal } from "./UserEditModal/UserEditModal";
import "./userProfile.css";

export const UserProfile = () => {
  const { username } = useParams();
  const { state } = useLocation();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { posts: feed } = useSelector((state) => state.posts);
  const { userData: loggedInUser } = useSelector((state) => state.auth);
  const [editProfileModalOpen, setEditProfileModal] = useState(false);

  useEffect(() => {
    if (!state) {
      dispatch(fetchUserFromUsername(username));
    } else {
      if (state.user) dispatch(setUser({ user: state.user }));
      else dispatch(fetchUserFromUsername(username));
    }
  }, [dispatch, state, username]);

  useEffect(() => {
    if (loggedInUser && user && loggedInUser._id === user._id) {
      dispatch(setUser({ user: loggedInUser }));
    }
  }, [user, loggedInUser, dispatch]);

  useEffect(() => {
    if (user && feed.length > 0) {
      for (let i = feed.length - 1; i >= 0; i--) {
        let postPresent = false;
        for (let j = 0; j < user.posts.length; j++) {
          if (user.posts[j]._id === feed[i]._id) {
            postPresent = true;
            break;
          }
        }
        if (!postPresent && user._id === feed[i].author._id) {
          dispatch(addPost({ post: feed[i] }));
        }
      }
    }
  }, [feed, user, dispatch]);

  const getProfileImage = () => {
    if (user) {
      if (user.profileImage) return user.profileImage;
      return "./broken";
    }
    return "./broken";
  };

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const getBirthDate = (birthDate) => {
    birthDate = new Date(birthDate);
    return `${
      monthNames[birthDate.getMonth()]
    } ${birthDate.getDate()}, ${birthDate.getFullYear()}`;
  };

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
              src={getProfileImage()}
              height="5rem"
              width="5rem"
              key={user && user._id}
            />
          </div>
          {loggedInUser && user && loggedInUser._id === user._id && (
            <>
              <Button
                rounded
                size="medium"
                onClick={() => dispatch(logoutUser())}
              >
                Log Out
              </Button>
              <Button
                rounded
                size="medium"
                onClick={() => setEditProfileModal((prev) => !prev)}
              >
                Edit Profile
              </Button>
            </>
          )}
          {loggedInUser && user && loggedInUser._id !== user._id ? (
            loggedInUser.following.includes(user._id) ? (
              <Button
                rounded
                size="medium"
                onClick={() => dispatch(unfollowUser(user._id))}
              >
                Following
              </Button>
            ) : (
              <span className="button-outline">
                <Button
                  rounded
                  size="medium"
                  onClick={() => dispatch(followUser(user._id))}
                >
                  Follow
                </Button>
              </span>
            )
          ) : (
            <></>
          )}
        </div>
        <div className="profile-name">{user?.name}</div>
        <div className="profile-username text-grey">@{user?.username}</div>
        {user?.bio && <div className="profile-bio">{user.bio}</div>}
        <div className="text-grey profile-personalInfo">
          {user?.location && (
            <div className="container-personalInfo">
              <span className="icon">
                <HiOutlineLocationMarker />
              </span>
              <span className="info-content">{user.location}</span>
            </div>
          )}

          {user?.website && (
            <div className="container-personalInfo">
              <span className="icon">
                <BsLink45Deg />
              </span>
              <span className="info-content">
                <a href={user.website} target="_blank" rel="noreferrer">
                  {user.website}
                </a>
              </span>
            </div>
          )}
        </div>
        <div className="text-grey profile-personalInfo">
          {user?.birthDate && (
            <div className="container-personalInfo">
              <span className="icon">
                <RiCake2Line />
              </span>
              <span className="info-content">
                {getBirthDate(user.birthDate)}
              </span>
            </div>
          )}
        </div>
        <div className="text-grey profile-personalInfo">
          {user?.createdAt && (
            <div className="container-personalInfo">
              <span className="icon">
                <RiCalendar2Line />
              </span>
              <span className="info-content">
                Joined{" "}
                {`${
                  monthNames[new Date(user.createdAt).getMonth()]
                }, ${new Date(user.createdAt).getFullYear()}`}
              </span>
            </div>
          )}
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
      <div className="profile-posts">
        {user && user.posts.length > 0 && (
          <div className="posts-list">
            {user.posts &&
              user.posts.length > 0 &&
              user.posts.map((post) => <PostCard key={post._id} post={post} />)}
          </div>
        )}
      </div>
      {editProfileModalOpen && user && (
        <UserEditModal
          setEditProfileModal={setEditProfileModal}
          user={user}
          profileImage={getProfileImage()}
        />
      )}
    </div>
  );
};
