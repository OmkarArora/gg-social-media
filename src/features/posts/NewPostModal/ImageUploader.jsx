import { FiImage } from "react-icons/fi";
import { useRef } from "react";

export const ImageUploader = ({ setPreviewImage, setSelectedFile }) => {
  const imagePicker = useRef(null);

  const onSelectFile = (event) => {
    const file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (e) => {
      setPreviewImage(reader.result);
    };
    setSelectedFile(file);
  };

  return (
    <div className="container-imageUploader">
      <div className="container-imagePicker">
        <FiImage onClick={() => imagePicker.current.click()} />
        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          multiple={false}
          id="input-imagePicker"
          ref={imagePicker}
          onChange={onSelectFile}
        />
      </div>
    </div>
  );
};
