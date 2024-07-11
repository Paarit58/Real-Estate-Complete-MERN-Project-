import React, { useState } from "react";
import FormComponent from "../component/Form";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Button, message } from "antd";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  Success,
  Fail,
  DeleteSuccess,
  SignOutSuccess,
} from "../redux/user/userSlice";
import ProfileImageComponent from "../component/ProfileImageComponent";
import ShowListing from "../component/ShowListing";

const ProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  const onDelete = async (e) => {
    try {
      setLoading(true);
      const response = await axios.delete("api/v1/user/deleteMe");
      console.log(response);
      dispatch(DeleteSuccess());
      setLoading(false);
      navigate("/sign-in", { replace: true });
    } catch (error) {
      setLoading(false);
    }
  };

  const onSignOut = async (e) => {
    try {
      setLoading(true);
      const response = await axios.get("api/v1/user/signout");
      dispatch(SignOutSuccess());
      console.log(response);
      setLoading(false);
      navigate("/sign-in", { replace: true });
    } catch (error) {
      setLoading(false);
    }
  };

  const onFinish = async (values) => {
    console.log(values);

    try {
      setLoading(true);
      const response = await axios.patch(
        "/api/v1/user/updateMe",
        JSON.stringify(values),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(Success(response.data.data));
      setLoading(false);
      message.success("Updated Successfully!!");
      console.log(response);
    } catch (error) {
      // dispatch(Fail());
      setLoading(false);
      message.error("Update Failed");
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="w-fit m-auto mt-5 ">
      <h3 className="font-semibold text-2xl text-center p-2 ">Profile</h3>

      <div className="text-center p-4">
        <ProfileImageComponent />
      </div>

      <FormComponent
        name="Update"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        loading={loading}
        initialValues={{
          username: currentUser.username,
          email: currentUser.email,
        }}
      />

      <div className="mt-3">
        <span>Want to update your Password?</span>
        <Link to={"/update-password"}>
          <span className="text-blue-700 ml-3">Click here</span>
        </Link>
      </div>
      <Button
        type="primary"
        className="w-full bg-green-600 hover:bg-green-500 text-white mt-2 "
        onClick={() => navigate("/create-listing")}
      >
        CREATE LISTING
      </Button>

      <div className="flex justify-between">
        <Button
          danger
          loading={loading}
          type="link"
          onClick={onDelete}
          className="px-0"
        >
          {loading ? "Deleteting Account" : "Delete Account"}
        </Button>
        <Button danger type="link" onClick={onSignOut} className="px-0">
          Sign Out
        </Button>
      </div>
      <div className="sm:w-96">
      <ShowListing user={currentUser} />
      </div>
    </div>
  );
};

export default ProfilePage;
