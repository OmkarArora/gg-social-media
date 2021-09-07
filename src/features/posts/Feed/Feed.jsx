import { useEffect } from "react";
import { Button } from "shoto-ui";
import { RiQuillPenFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPosts,
  likePost,
  unlikePost,
  deleteFeedPost,
  setFeedPosts,
  setFirstLoadStatus,
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
  const {
    token,
    userData,
    status: authStatus,
  } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      if (token) {
        setupAuthHeaderForServiceCalls(token);
      }
      if (userData && userData.feed) {
        dispatch(setFeedPosts({ posts: userData.feed }));
        dispatch(setFirstLoadStatus({ firstLoad: false }));
      }
    }
  }, [token, userData, status, dispatch]);

  useEffect(() => {
    dispatch(setActiveNavTab({ activeTab: "home" }));
  });

  const refreshFeed = () => {
    dispatch(fetchPosts());
  };

  return (
    <div className="container-main-content">
      {status === "error" && error && (
        <div style={{ color: "red" }}>{error}</div>
      )}
      {status === "loading" && !firstLoad && <LoadingModal />}
      <div className="page-heading">
        Feed
        {authStatus !== "loading" && (
          <Button
            rounded
            bgColor="var(--dark-grey-color)"
            onClick={refreshFeed}
          >
            Refresh Feed
          </Button>
        )}
      </div>
      <div className="posts-list">
        {(status === "loading" || status === "idle") && firstLoad ? (
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
      {status !== "loading" && authStatus !== "loading" && (
        <div className="container-fab">
          <Button type="icon" onClick={() => setNewPostModalVisibility(true)}>
            <RiQuillPenFill />
          </Button>
        </div>
      )}
    </div>
  );
};
