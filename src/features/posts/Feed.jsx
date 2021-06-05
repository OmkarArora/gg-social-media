import { Button } from "shoto-ui";
import { RiQuillPenFill } from "react-icons/ri";
import "./feed.css";
import { useState } from "react";
import { NewPostModal } from "./NewPostModal/NewPostModal";

export const Feed = () => {
  const [isNewPostModalVisible, setNewPostModalVisibility] = useState(false);
  return (
    <div className="container-feed">
      <div>Posts</div>
      <div>Post 1</div>
      <div>Post 2</div>
      <div className="container-fab">
        <Button type="icon" onClick={() => setNewPostModalVisibility(true)}>
          <RiQuillPenFill />
        </Button>
      </div>
	  {isNewPostModalVisible && <NewPostModal onClose={() => setNewPostModalVisibility(false)}/>}
    </div>
  );
};
