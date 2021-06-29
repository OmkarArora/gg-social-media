import {Button} from "shoto-ui";
import { RiCloseLine } from "react-icons/ri";
import "./userEditModal.css";

export const UserEditModal = ({setEditProfileModal}) => {
  return (
    <div className="container-user-editModal">
      <div className="user-editModal">
        <div className="editModal-header">
          <div className="header-main">
            <span onClick={() => setEditProfileModal(false)} className="icon icon-fill icon-close">
              <RiCloseLine />
            </span>
            <span>Edit profile</span>
          </div>
		  <div><Button rounded size="medium">
            Save
          </Button></div>
          
        </div>
		<div className="editModal-content">
			content
		</div>
      </div>
    </div>
  );
};
