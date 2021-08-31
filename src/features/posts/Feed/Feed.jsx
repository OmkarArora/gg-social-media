import { useEffect } from "react";
import { Button } from "shoto-ui";
import { RiQuillPenFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPosts,
  likePost,
  unlikePost,
  deleteFeedPost,
} from "../postsSlice";
import { PostCard } from "../PostCard/PostCard";
import { setActiveNavTab } from "../../navbar/navSlice";
import { setupAuthHeaderForServiceCalls } from "../../../helper";
import { PostSkeleton } from "../PostSkeleton/PostSkeleton";
import { LoadingModal } from "../../loader/LoadingModal/LoadingModal";
import "./feed.css";

export const Feed = ({ setNewPostModalVisibility }) => {
  const { status, error, posts, firstLoad } = useSelector(
    (state) => state.posts
  );
  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      if (token) {
        setupAuthHeaderForServiceCalls(token);
      }
      dispatch(fetchPosts());
    }
  }, [token, status, dispatch]);

  useEffect(() => {
    dispatch(setActiveNavTab({ activeTab: "home" }));
  });

  return (
    <div className="container-main-content">
      {status === "error" && error && (
        <div style={{ color: "red" }}>{error}</div>
      )}
      {status==="loading" && !firstLoad && <LoadingModal/>}
      <div className="page-heading">Feed</div>
      <div className="posts-list">
        {status === "loading" && firstLoad ? (
          <>
            <PostSkeleton />
            <PostSkeleton />
          </>
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <PostCard
              post={post}
              key={post._id}
              likePost={likePost}
              unlikePost={unlikePost}
              deletePost={deleteFeedPost}
            />
          ))
        ) : (
          <div className="placeholder-text">
            Follow people to see their posts
          </div>
        )}
      </div>
      <div className="container-fab">
        <Button type="icon" onClick={() => setNewPostModalVisibility(true)}>
          <RiQuillPenFill />
        </Button>
      </div>
    </div>
  );
};
