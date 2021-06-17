import { useParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { fetchUserFromUsername } from "./userSlice";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./userSlice";
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
      if (state.user) dispatch(setUser({user: state.user}));
      else dispatch(fetchUserFromUsername(username));
    }
  }, [dispatch, state, username]);

  return <div>user profile</div>;
};
