import { useParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { setDetailsPagePost, fetchPostDetails } from "../postsSlice";
import { useDispatch, useSelector } from "react-redux";
import { PostCard } from "../PostCard/PostCard";

export const PostPage = () => {
  const { postId } = useParams();
  const { state } = useLocation();
  const { detailsPagePost } = useSelector((state) => state.posts);
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

  return (
    <div className="container-postDetails-page">
      {detailsPagePost && <PostCard post={detailsPagePost} />}
    </div>
  );
};
