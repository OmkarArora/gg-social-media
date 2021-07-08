import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendPost } from "../postsSlice";
import { Button, Avatar } from "shoto-ui";
import { RiCloseLine } from "react-icons/ri";
import { TiDelete } from "react-icons/ti";
import { ImageUploader } from "./ImageUploader";
import axios from "axios";
import { showAlert } from "../../alert/alertSlice";
import "./newPostModal.css";

export const NewPostModal = ({ onClose }) => {
  const { userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [postText, setPostText] = useState("");
  const totalCharacters = 100;
  const availableCharacters = totalCharacters - postText.length;

  // Image uploader
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedURL, setUploadedURL] = useState("");

  const uploadImage = async () => {
    let axiosInstance = axios.create();
    delete axiosInstance.defaults.headers.common["Authorization"];

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append(
        "upload_preset",
        `${process.env.REACT_APP_IMAGE_UPLOAD_PRESET}`
      );
      formData.append("folder", "firstFolder-1");
      const response = await axiosInstance.post(
        `${process.env.REACT_APP_IMAGE_UPLOAD_API}`,
        formData
      );
      setUploadedURL(response.data.secure_url);
      setPreviewImage(null);
      setSelectedFile(null);
      return response.data.secure_url;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const removeSelectedImage = () => {
    setPreviewImage(null);
    setSelectedFile(null);
  };

  const postTextarea = useRef(null);
  useEffect(() => {
    postTextarea.current.focus();
  }, []);

  const warningColor = "rgb(255,216,0)";

  const availableCharColor = availableCharacters < 0 ? warningColor : "#fff";

  const onClickPost = async () => {
    let imageURL = "";
    try {
      if (previewImage) {
        imageURL = await uploadImage();
      }
    } catch (error) {
      dispatch(showAlert({ type: "error", data: "Couldn't upload image" }));
      return;
    }

    let post = {
      author: userData._id,
      content: {
        text: postText,
        media: [imageURL],
      },
    };
    dispatch(sendPost(post));
    onClose();
  };

  return (
    <div className="modal-newPost">
      <div className="container-newPost">
        <div className="header-newPost">
          <div className="icon icon-close" onClick={() => onClose()}>
            <RiCloseLine />
          </div>
          <div className="container-btn-post">
            <Button
              rounded
              disabled={availableCharacters < 0 ? true : false}
              onClick={onClickPost}
            >
              Post
            </Button>
          </div>
        </div>
        <div className="body-newPost">
          <div className="container-avatar">
            <Avatar
              alt={userData?.name}
              src={
                userData && userData.profileImage ? userData.profileImage : ""
              }
            />
          </div>
          <textarea
            placeholder="What's happening?"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            ref={postTextarea}
          />
        </div>
        {previewImage && (
          <div className="container-selectedImage">
            <img
              src={previewImage}
              alt={selectedFile?.name}
              className="post-selectedImage"
            />
            <span
              className="icon icon-fill icon-delete-image"
              onClick={removeSelectedImage}
            >
              <TiDelete />
            </span>
          </div>
        )}

        <div className="footer">
          <span>
            <ImageUploader
              previewImage={previewImage}
              setPreviewImage={setPreviewImage}
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              uploadedURL={uploadedURL}
              setUploadedURL={setUploadedURL}
            />
          </span>
          <span
            className="available-characters"
            style={{ color: availableCharColor }}
          >
            {availableCharacters}
          </span>
        </div>
      </div>
    </div>
  );
};
