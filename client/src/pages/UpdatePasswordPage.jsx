import React, { useState } from "react";
import {
  CheckOutlined,
  LockFilled,
  LockOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Fail, Success } from "../redux/user/userSlice";

function UpdatePasswordPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const onFinish = async (values) => {
    console.log(values);

    try {
      setLoading(true);
      const response = await axios.patch(
        "/api/v1/user/updateMyPassword",
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
      navigate("/profile",{replace:true});
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
      <h3 className="font-semibold text-2xl text-center p-6 ">
        Update Password
      </h3>

      <Form
        name="update-password"
        className="sm:w-96"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        variant="borderless"
      >
        <Form.Item
          name="passwordCurrent"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Old Password"
            className="bg-white"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockFilled className="site-form-item-icon" />}
            placeholder="New Password"
            className="bg-white"
          />
        </Form.Item>
        <Form.Item
          name="passwordConfirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<CheckOutlined className="site-form-item-icon" />}
            placeholder="Confirm New Password"
            className="bg-white"
          />
        </Form.Item>
        <Button
          type="primary"
          loading={loading}
          htmlType="submit"
          className="w-full bg-[#334155] hover:bg-[#334155cc]"
        >
          Update Password
        </Button>
      </Form>
    </div>
  );
}

export default UpdatePasswordPage;
