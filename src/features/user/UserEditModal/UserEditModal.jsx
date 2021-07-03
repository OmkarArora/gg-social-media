import { Button } from "shoto-ui";
import { RiCloseLine } from "react-icons/ri";
import { Avatar } from "shoto-ui";
import "./userEditModal.css";
import { ControlledInput } from "../ControlledInput/ControlledInput";
import { useState } from "react";
import { updateUserDetails } from "../../authentication/authSlice";
import { useDispatch } from "react-redux";

export const UserEditModal = ({ setEditProfileModal, user, profileImage }) => {
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio ? user.bio : "");
  const [location, setLocation] = useState(user.location ? user.location : "");
  const [website, setWebsite] = useState(user.website ? user.website : "");
  const [birthDate, setBirthDate] = useState(
    user.birthDate ? user.birthDate : null
  );

  const dispatch = useDispatch();

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const saveUserDetails = () => {
    let updates = {};
    updates.name = name;
    updates.bio = bio;
    updates.location = location;
    updates.website = website;
    if(birthDate){
      updates.birthDate = new Date(birthDate).toISOString();
    }
    dispatch(updateUserDetails({userUpdates: updates, userId: user._id}));
    setEditProfileModal(false);
  };

  const getBirthDate = () => {
    let date = null;
    if (birthDate) {
      date = new Date(birthDate);
      date.setDate(date.getDate());
      date = date.toISOString().substr(0, 10);
      return date;
    }
  };

  const getCurrentDate = () => {
    let date = new Date();
    date.setDate(date.getDate());
    date = date.toISOString().substr(0, 10);
    return date;
  }

  return (
    <div className="container-user-editModal">
      <div className="user-editModal">
        <div className="editModal-header">
          <div className="header-main">
            <span
              onClick={() => setEditProfileModal(false)}
              className="icon icon-fill icon-close"
            >
              <RiCloseLine />
            </span>
            <span>Edit profile</span>
          </div>
          <div>
            <Button rounded size="medium" onClick={saveUserDetails}>
              Save
            </Button>
          </div>
        </div>
        <div className="editModal-content">
          <div className="container-banner">
            {user.bannerImage ? (
              <img
                src={user.bannerImage}
                alt="user banner"
                className="img-banner"
              />
            ) : (
              <div className="banner-placeholder">{user.name}</div>
            )}
          </div>
          <div className="container-userInfo">
            <div className="container-avatar">
              <Avatar
                alt={user.name}
                src={profileImage}
                height="5rem"
                width="5rem"
                key={user._id}
              />
            </div>
            <div className="container-editInputs">
              <ControlledInput
                heading="Name"
                maxLength={50}
                type="input"
                onInputChange={setName}
                value={name}
              />
              <ControlledInput
                heading="Bio"
                maxLength={160}
                type="textarea"
                onInputChange={setBio}
                value={bio}
              />
              <ControlledInput
                heading="Location"
                maxLength={30}
                type="input"
                onInputChange={setLocation}
                value={location}
              />
              <ControlledInput
                heading="Website"
                maxLength={100}
                type="input"
                onInputChange={setWebsite}
                value={website}
              />
              <div className="container-editBirthDate">
                <div className="header-birthDate">Birth date</div>
                <div className="container-dateEdit">
                  {birthDate &&
                    `${
                      monthNames[new Date(birthDate).getMonth()]
                    } ${new Date(birthDate).getDate()}, ${new Date(birthDate).getFullYear()}`}
                  <input
                    type="date"
                    max={getCurrentDate()}
                    defaultValue={getBirthDate()}
                    onChange={(e) => {
                      setBirthDate(new Date(e.target.value));
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
