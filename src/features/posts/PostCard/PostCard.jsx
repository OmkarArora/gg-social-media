import "./postcard.css";
import {Avatar} from "shoto-ui";

export const PostCard = ({ post }) => {
  return (
    <div className="container-postcard">
      <div className="container-profilePic">
        <Avatar src={post.author.profileImage} alt={`${post.author.name}`} />
      </div>
      <div className="container-post-content">
        <div className="author-name">{post.author.name}</div>
        <div className="post-content">{post.content.text}</div>
      </div>
    </div>
  );
};
