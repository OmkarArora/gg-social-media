import { Avatar } from "shoto-ui";
import { getRelativeTime } from "../../../helper";
import { Link } from "react-router-dom";
import "./postcard.css";

export const PostCard = ({ post }) => {
  return (
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
      <div className="container-post-content">
        <div className="author-details">
          <div>{post.author.name}</div>
          <div className="text-grey">
            @{post.author.username} <span className="separator-dot">.</span>{" "}
            {getRelativeTime(
              new Date().getTime(),
              new Date(post.updatedAt).getTime()
            )}
          </div>
        </div>
        <div className="post-content">{post.content.text}</div>
      </div>
    </div>
  );
};
