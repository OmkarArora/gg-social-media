import { useState, useEffect } from "react";
import { Button, Avatar } from "shoto-ui";
import { RiCloseLine } from "react-icons/ri";
import { ControlledInput } from "../ControlledInput/ControlledInput";
import { updateUserDetails } from "../../authentication/authSlice";
import { showAlert } from "../../alert/alertSlice";
import { useDispatch } from "react-redux";
import { ImageUploader } from "../../posts/NewPostModal/ImageUploader";
import axios from "axios";
import "./userEditModal.css";
import { crop } from "../../../helper";
import { LoadingModal } from "../../loader/LoadingModal/LoadingModal";

export const UserEditModal = ({ setEditProfileModal, user, profileImage }) => {
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio ? user.bio : "");
  const [location, setLocation] = useState(user.location ? user.location : "");
  const [website, setWebsite] = useState(user.website ? user.website : "");
  const [birthDate, setBirthDate] = useState(
    user.birthDate ? user.birthDate : null
  );

  const [localAppState, setLocalAppState] = useState("success");

  // Image uploader
  const [previewBannerImage, setPreviewBannerImage] = useState(null);
  const [selectedBannerFile, setSelectedBannerFile] = useState(null);
  const [croppedBanner, setCroppedBanner] = useState(null);
  const [bannerBlob, setBannerBlob] = useState(null);

  const [previewProfileImage, setPreviewProfileImage] = useState(null);
  const [selectedProfileFile, setSelectedProfileFile] = useState(null);

  useEffect(() => {
    if (previewBannerImage !== null) {
      (async () => {
        const croppedCanvas = await crop(previewBannerImage, 1500 / 500);
        const croppedImage = croppedCanvas.toDataURL();
        setCroppedBanner(croppedImage);
        croppedCanvas.toBlob((blob) => {
          setBannerBlob(blob);
        }, "image/png");
      })();
    }
  }, [previewBannerImage]);

  const uploadImage = async (imageFile, setPreviewImage, setSelectedFile) => {
    let axiosInstance = axios.create();
    delete axiosInstance.defaults.headers.common["Authorization"];

    try {
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append(
        "upload_preset",
        `${process.env.REACT_APP_IMAGE_UPLOAD_PRESET}`
      );
      formData.append("folder", "firstFolder-1");
      const response = await axiosInstance.post(
        `${process.env.REACT_APP_IMAGE_UPLOAD_API}`,
        formData
      );
      setPreviewImage(null);
      setSelectedFile(null);
      return response.data.secure_url;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

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

  const saveUserDetails = async () => {
    setLocalAppState("loading");
    let bannerURL = "";
    let profileURL = "";
    try {
      if (bannerBlob) {
        bannerURL = await uploadImage(
          bannerBlob,
          setPreviewBannerImage,
          setSelectedBannerFile
        );
      }
    } catch (error) {
      dispatch(
        showAlert({ type: "error", data: "Couldn't upload banner image" })
      );
      return;
    }

    try {
      if (selectedProfileFile) {
        profileURL = await uploadImage(
          selectedProfileFile,
          setPreviewProfileImage,
          setSelectedProfileFile
        );
      }
    } catch (error) {
      dispatch(
        showAlert({ type: "error", data: "Couldn't upload profile image" })
      );
      return;
    }

    let updates = {};
    updates.name = name;
    updates.bio = bio;
    updates.location = location;
    updates.website = website;
    if (birthDate) {
      updates.birthDate = new Date(birthDate).toISOString();
    }
    if (bannerURL) {
      updates.bannerImage = bannerURL;
    }
    if (profileURL) {
      updates.profileImage = profileURL;
    }
    dispatch(updateUserDetails({ userUpdates: updates, userId: user._id }));
    setLocalAppState("success");
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
  };

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
            {croppedBanner ? (
              <img
                src={croppedBanner}
                alt="user banner"
                className="img-banner"
              />
            ) : user.bannerImage ? (
              <img
                src={user.bannerImage}
                alt="user banner"
                className="img-banner"
              />
            ) : (
              <div className="banner-placeholder">{user.name}</div>
            )}
            <span className="container-bannerImageUploader">
              <ImageUploader
                setPreviewImage={setPreviewBannerImage}
                setSelectedFile={setSelectedBannerFile}
                selectedFile={selectedBannerFile}
              />
            </span>
          </div>
          <div className="container-userInfo">
            <div className="container-avatar">
              {previewProfileImage ? (
                <Avatar
                  alt={user.name}
                  src={previewProfileImage}
                  height="5rem"
                  width="5rem"
                  key={user._id}
                />
              ) : (
                <Avatar
                  alt={user.name}
                  src={profileImage}
                  height="5rem"
                  width="5rem"
                  key={user._id}
                />
              )}
              {/* <Avatar
                alt={user.name}
                src={profileImage}
                height="5rem"
                width="5rem"
                key={user._id}
              /> */}
              <span className="container-profileImageUploader">
                <ImageUploader
                  setPreviewImage={setPreviewProfileImage}
                  selectedFile={selectedProfileFile}
                  setSelectedFile={setSelectedProfileFile}
                />
              </span>
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
                    `${monthNames[new Date(birthDate).getMonth()]} ${new Date(
                      birthDate
                    ).getDate()}, ${new Date(birthDate).getFullYear()}`}
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
      {localAppState === "loading" && <LoadingModal />}
    </div>
  );
};
