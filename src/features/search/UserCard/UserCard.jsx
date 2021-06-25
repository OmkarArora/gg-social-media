import { Avatar } from "shoto-ui";
import "./userCard.css";

export const UserCard = ({ user }) => {
  return (
    <div className="user-search-card">
      <div className="container-profileImage">
        <Avatar
          src={user.profileImage ? user.profileImage : ""}
          alt={`${user.name}`}
          height="3rem"
          width="3rem"
        />
      </div>
      <div className="user-details">
        <div className="user-name">{user.name}</div>
        <div className="text-grey">@{user.username}</div>
      </div>
    </div>
  );
};
