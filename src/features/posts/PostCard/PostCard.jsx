import { Avatar } from "shoto-ui";
import { getRelativeTime } from "../../../helper";
import { Link } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import "./postcard.css";
import { useDispatch, useSelector } from "react-redux";

export const PostCard = ({ post, likePost, unlikePost }) => {
  const { userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const getHeartIcon = () => {
    if (post.likes && post.likes.length > 0) {
      if (post.likes.includes(userData._id)) {
        return (
          <span
            className="icon icon-fill"
            onClick={() => {
              dispatch(unlikePost(post._id));
            }}
          >
            <AiFillHeart />
          </span>
        );
      }
    }
    return (
      <span className="icon">
        <AiOutlineHeart
          onClick={() => {
            dispatch(likePost(post._id));
          }}
        />
      </span>
    );
  };

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
