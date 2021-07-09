import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveNavTab } from "../navbar/navSlice";
import { RiQuillPenFill } from "react-icons/ri";
import { Button } from "shoto-ui";
import { NotificationCard } from "./NotificationCard/NotificationCard";

export const Notifications = ({ setNewPostModalVisibility }) => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);
  let notifications = userData.notifications;

  useEffect(() => {
    dispatch(setActiveNavTab({ activeTab: "notifications" }));
  });

  return (
    <div className="container-main-content">
      <div className="page-heading">Notifications</div>
      {notifications && notifications.length > 0 ? (
        <div className="container-notifications">
          {notifications.map((item) => (
            <NotificationCard notification={item} key={item._id} />
          ))}
        </div>
      ) : (
        <div className="search-placeholder">Nothing to see here</div>
      )}

      <div className="container-fab">
        <Button type="icon" onClick={() => setNewPostModalVisibility(true)}>
          <RiQuillPenFill />
        </Button>
      </div>
    </div>
  );
};
