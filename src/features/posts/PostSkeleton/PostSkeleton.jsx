import Skeleton from "react-loading-skeleton";
import "./postSkeleton.css";

export const PostSkeleton = () => (
    <div className="container-postSkeleton">
      <div className="skeleton-userDetails">
        <Skeleton circle={true} height={50} width={50} />
        <Skeleton width={150} />
      </div>
      <Skeleton count={2} />
    </div>
  );
