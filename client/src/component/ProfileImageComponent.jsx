import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { Avatar, message, Progress, Upload } from "antd";
import { app } from "../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { UploadSuccess, Success, UploadFail } from "../redux/user/userSlice";

const ProfileImageComponent = () => {
  const [progress, setProgress] = useState(null);

  const dispatch = useDispatch();
  const profileImage = useSelector((state) => state.user.profileImage);
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const patchAvatar = async () => {
      if (profileImage) {
        try {
          const response = await axios.patch(
            "/api/v1/user/updateMe",
            JSON.stringify({ avatar: profileImage }),
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          dispatch(Success(response.data.data));
        } catch (error) {
          console.log(error);
          dispatch(UploadFail());
        }

        console.log("abc");
        patchAvatar();
      }
    };
  }, [profileImage]);

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleFileUpload = ({ file }) => {
    console.log(file);
    const storage = getStorage(app);
    const fileName = Date.now() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progressPerc = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progressPerc);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          dispatch(UploadSuccess(downloadUrl));

          setProgress(null);
          message.success("Profile Image uploaded Successfully!!");
        });
      }
    );
  };

  return (
    <Upload
      name="avatar"
      className="avatar-uploader"
      showUploadList={false}
      beforeUpload={beforeUpload}
      customRequest={handleFileUpload}
    >
      <Avatar
        size={64}
        className="cursor-pointer"
        src={currentUser.avatar}
        alt="avatar"
      />
      {progress && <Progress percent={progress} strokeWidth={5} />}
    </Upload>
  );
};
export default ProfileImageComponent;
