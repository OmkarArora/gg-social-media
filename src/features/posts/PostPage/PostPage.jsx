import { useParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import {
  setDetailsPagePost,
  fetchPostDetails,
  deleteFeedPost,
  likePost,
  unlikePost,
} from "../postsSlice";
import { useDispatch, useSelector } from "react-redux";
import { PostCard } from "../PostCard/PostCard";
import { fetchUserFromUsername } from "../../user/userSlice";
import { PostNotFound } from "../PostNotFound/PostNotFound";
import { PostSkeleton } from "../PostSkeleton/PostSkeleton";
import { LoadingModal } from "../../loader/LoadingModal/LoadingModal";

export const PostPage = () => {
  const { postId } = useParams();
  const { state } = useLocation();
  const { detailsPagePost, firstLoad, status } = useSelector(
    (state) => state.posts
  );
  const { isUserLoggedIn, userData } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!state) {
      dispatch(fetchPostDetails(postId));
    } else {
      if (state.post)
        dispatch(setDetailsPagePost({ detailsPagePost: state.post }));
      else dispatch(fetchPostDetails(postId));
    }
  }, [dispatch, state, postId]);

  useEffect(() => {
    if (isUserLoggedIn && !user) {
      if (userData) dispatch(fetchUserFromUsername(userData.username));
    }
  });

  return (
    <div className="container-postDetails-page">
      {status === "loading" && firstLoad && <PostSkeleton />}
      {status === "loading" && !firstLoad && <LoadingModal />}
      {status !== "loading" && detailsPagePost === null && <PostNotFound />}
      {detailsPagePost && (
        <PostCard
          post={detailsPagePost}
          likePost={likePost}
          unlikePost={unlikePost}
          deletePost={deleteFeedPost}
        />
      )}
    </div>
  );
};
