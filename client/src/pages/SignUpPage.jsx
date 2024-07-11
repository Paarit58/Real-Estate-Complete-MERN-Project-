// import React from "react";
// import withSignUp from "../HOC/withSignUp";

// import FormComponent from "../component/Form";

// const SignUp = withSignUp(FormComponent);

// export default SignUp;

import React, { useState } from "react";
import FormComponent from "../component/Form";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "antd";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Success, Fail } from "../redux/user/userSlice";
import Oauth from "../component/Oauth";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const onFinish = async (values) => {
    console.log(values);

    try {
      setLoading(true);
      const response = await axios.post(
        "/api/v1/user/signup",
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
      console.log(error);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="w-fit m-auto mt-10 ">
      <h3 className="font-semibold text-2xl text-center p-6 ">Sign Up</h3>
      <FormComponent
        name="Sign Up"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        loading={loading}
      />
      <Oauth />

      <div className="mt-3">
        <span>Have an account?</span>
        <Link to={"/sign-in"}>
          <span className="text-blue-700 ml-3">Sign In</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
