import { useEffect } from "react";
import { Avatar } from "shoto-ui";
import { getRelativeTime } from "../../../helper";
import { Link } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { refreshFromUsername, setUpdatePostStatus } from "../../authentication/authSlice";
import { fetchPosts, setUpdateFeedPostStatus } from "../../posts/postsSlice";
import "./postcard.css";

export const PostCard = ({ post, likePost, unlikePost }) => {
  const { userData, shouldUpdatePost } = useSelector((state) => state.auth);
  const { shouldUpdateFeedPost } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  const getHeartIcon = () => {
    if (post.likes && post.likes.length > 0) {
      if (post.likes.includes(userData._id)) {
        return (
          <span
            className="icon icon-fill"
            onClick={() => {
              dispatch(unlikePost(post._id));
              if (post.author._id === userData._id) {
                if (window.location.pathname === "/") {
                  dispatch(setUpdatePostStatus({ updateStatus: true }));
                } else {
                  dispatch(setUpdateFeedPostStatus({ updateStatus: true }));
                }
              }
            }}
          >
            <AiFillHeart />
          </span>
        );
      }
    }
    return (
      <span
        className="icon"
        onClick={() => {
          dispatch(likePost(post._id));
          if (post.author._id === userData._id) {
            if (window.location.pathname === "/") {
              dispatch(setUpdatePostStatus({ updateStatus: true }));
            } else {
              dispatch(setUpdateFeedPostStatus({ updateStatus: true }));
            }
          }
        }}
      >
        <AiOutlineHeart />
      </span>
    );
  };

  useEffect(() => {
    if (shouldUpdatePost) {
      dispatch(refreshFromUsername(userData.username));
      dispatch(setUpdatePostStatus({ updateStatus: false }));
    }
  }, [userData.username, shouldUpdatePost, dispatch]);

  useEffect(() => {
    if (shouldUpdateFeedPost) {
      dispatch(fetchPosts());
      dispatch(setUpdateFeedPostStatus({ updateStatus: false }));
    }
  }, [shouldUpdateFeedPost, dispatch]);

  return (
    <div className="postcard-wrapper">
      <div className="container-postcard">
        <div className="container-profilePic">
          <Link to={`/${post.author.username}`}>
            <Avatar
              src={post.author.profileImage ? post.author.profileImage : ""}
              alt={`${post.author.name}`}
              height="3rem"
              width="3rem"
            />
          </Link>
        </div>
        <Link to={`/post/${post._id}`} state={{ post }}>
          <div className="container-post-content">
            <div className="author-details">
              <div>{post.author.name}</div>
              <div className="text-grey">
                @{post.author.username} <span className="separator-dot">.</span>{" "}
                {getRelativeTime(
                  new Date().getTime(),
                  new Date(post.createdAt).getTime()
                )}
              </div>
            </div>
            <div className="post-content">
              {post.content.text}
              {post.content.media.length > 0 && post.content.media[0] !== "" && (
                <div className="container-postImage">
                  <img src={post.content.media[0]} alt="post" />
                </div>
              )}
            </div>
          </div>
        </Link>
      </div>
      <div className="container-post-actions">{getHeartIcon()}</div>
    </div>
  );
};
