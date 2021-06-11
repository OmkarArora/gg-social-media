import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { NewPostModal } from "../posts/NewPostModal/NewPostModal";
import { setActiveNavTab } from "../navbar/navSlice";
import { RiQuillPenFill } from "react-icons/ri";
import { Button } from "shoto-ui";

export const Search = () => {
  const dispatch = useDispatch();
  const [isNewPostModalVisible, setNewPostModalVisibility] = useState(false);

  useEffect(() => {
    dispatch(setActiveNavTab({ activeTab: "search" }));
  });

  return (
    <div className="container-main-content">
      Search here
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
