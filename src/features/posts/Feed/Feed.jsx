import { Button } from "shoto-ui";
import { RiQuillPenFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { NewPostModal } from "../NewPostModal/NewPostModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../postsSlice";
import { PostCard } from "../PostCard/PostCard";
import { setActiveNavTab } from "../../navbar/navSlice";
import "./feed.css";

export const Feed = () => {
  const [isNewPostModalVisible, setNewPostModalVisibility] = useState(false);

  const { status, error, posts } = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  useEffect(() => {
    dispatch(setActiveNavTab({ activeTab: "home" }));
  });

  return (
    <div className="container-main-content">
      {status === "error" && error && (
        <div style={{ color: "red" }}>{error}</div>
      )}
      {status === "loading" && <div>Loading...</div>}
      <div className="posts-list">
        {posts.map((post) => (
          <PostCard post={post} key={post._id} />
        ))}
      </div>
      <div className="container-fab">
        <Button type="icon" onClick={() => setNewPostModalVisibility(true)}>
          <RiQuillPenFill />
        </Button>
      </div>
      {isNewPostModalVisible && (
        <NewPostModal onClose={() => setNewPostModalVisibility(false)} />
      )}
    </div>
  );
};
