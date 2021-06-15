import { Button, Avatar } from "shoto-ui";
import { RiCloseLine } from "react-icons/ri";
import "./newPostModal.css";
import { useState } from "react";
import { useSelector } from "react-redux";

export const NewPostModal = ({onClose}) => {
  const {userData} = useSelector(state => state.auth);
  const [postText, setPostText] = useState("");
  const totalCharacters = 100;
  const availableCharacters = totalCharacters - postText.length;

  const warningColor = "rgb(255,216,0)";

  const availableCharColor = availableCharacters < 0 ? warningColor : "#fff";

  return (
    <div className="modal-newPost">
      <div className="container-newPost">
        <div className="header">
          <div className="icon icon-close" onClick={() => onClose()}>
            <RiCloseLine />
          </div>
          <div className="container-btn-post">
            <Button rounded disabled={availableCharacters<0?true:false}>Post</Button>
          </div>
        </div>
        <div className="body">
          <div className="container-avatar">
            <Avatar
              alt="John Doe"
              src={userData?.profileImage}
            />
          </div>
          <textarea
            placeholder="What's happening?"
            value={postText}
            onChange={(e) => 
                setPostText(e.target.value)
            }
          />
        </div>
        <div className="footer">
          <span className="available-characters" style={{color: availableCharColor}}>{availableCharacters}</span>
        </div>
      </div>
    </div>
  );
};
