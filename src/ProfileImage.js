import React, { useRef, useState, useEffect } from "react";
import { getDownloadURL, uploadImage } from "./firebase/user";

export const ProfileImage = ({ id }) => {
  const fileInput = useRef(null);
  const [imageUrl, setImageUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    getDownloadURL(id).then((url) => !!url && setImageUrl(url));
  }, [id]);

  const fileChange = async (files) => {
    const ref = await uploadImage(id, files[0], updateProgress);
    const downloadUrl = await ref.getDownloadURL();
    setImageUrl(downloadUrl);
  };

  const updateProgress = (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    setUploadProgress(progress);
  };

  return (
    <div className="four wide column profile-image">
      <img
        className="ui image"
        src={imageUrl || "/drawCollection.png"}
        alt="profile"
      />
      <input
        className="file-input"
        type="file"
        accept=".png, .jpg"
        ref={fileInput}
        onChange={(e) => fileChange(e.target.files)}
      />
      <progress style={{ width: "100%" }} max="100" value={uploadProgress} />
      <button
        className="ui grey button upload-button"
        onClick={() => fileInput.current.click()}
      >
        Upload/Update Photo
      </button>
    </div>
  );
};
