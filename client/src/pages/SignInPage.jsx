import React, { useState } from "react";
import FormComponent from "../component/Form";
import { Link, useNavigate } from "react-router-dom";
import { Button, message } from "antd";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Success, Fail } from "../redux/user/userSlice";
import Oauth from "../component/Oauth";

const SignInPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const onFinish = async (values) => {
    console.log(values);

    try {
      setLoading(true);
      const response = await axios.post(
        "/api/v1/user/signin",
        JSON.stringify(values),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(Success(response.data.data));
      setLoading(false);
      console.log(response);
      navigate("/", { replace: true });
    } catch (error) {
      dispatch(Fail());
      setLoading(false);
      message.error(error.response.data.message);
      console.log(error);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="w-fit m-auto mt-10 ">
      <h3 className="font-semibold text-2xl text-center p-6 ">Sign In</h3>
      <FormComponent
        name="Sign In"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        loading={loading}
      />

      <Oauth />
      {/* <Button
        type="primary"
        className="w-full bg-red-600 hover:bg-red-500 text-white mt-2 "
      >
        Sign In with GOOGLE
      </Button> */}
      <div className="mt-3">
        <span>Don't have an account?</span>
        <Link to={"/sign-up"}>
          <span className="text-blue-700 ml-3">Sign Up</span>
        </Link>
      </div>
    </div>
  );
};

export default SignInPage;
