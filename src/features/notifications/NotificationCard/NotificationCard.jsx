import { FaUser } from "react-icons/fa";
import { RiNotification3Fill } from "react-icons/ri";
import { Avatar } from "shoto-ui";
import { getProfileImage } from "../../../helper";
import "./notificationCard.css";

export const NotificationCard = ({ notification }) => {
  const user = notification.user;
  const notificationType = notification.notificationType;

  return (
    <div className="notification-card">
      <div className="notification-icon">
        <span className="icon icon-fill">
          {notificationType === "follow" ? <FaUser /> : <RiNotification3Fill />}
        </span>
      </div>
      <div className="notification-details">
        {user && (
          <Avatar
            alt={user?.name}
            src={getProfileImage(user)}
            height="2rem"
            width="2rem"
            key={user && user._id}
          />
        )}
        <div>
          <span className="highlight">{user?.name}</span>
          {notificationType === "follow" ? ` followed you !` : ` posted`}
        </div>
      </div>
    </div>
  );
};
