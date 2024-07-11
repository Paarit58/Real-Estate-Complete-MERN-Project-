import {
  CheckOutlined,
  LockOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import React from "react";

function FormComponent(props) {
  return (
    <Form
      name={props.name}
      className="sm:w-96"
      initialValues={{
        ...props.initialValues,
        remember: true,
      }}
      onFinish={props.onFinish}
      onFinishFailed={props.onFinishFailed}
      variant="borderless"
    >
      {props.name !== "Sign In" && (
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
            className="bg-white"
          />
        </Form.Item>
      )}
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your email address!",
          },
          {
            type: "email",
            message: "Please provide a valid email",
          },
        ]}
      >
        <Input
          prefix={<MailOutlined className="site-form-item-icon" />}
          placeholder="Email"
          className="bg-white"
        />
      </Form.Item>
      {props.name !== "Update" && (
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
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
            className="bg-white"
          />
        </Form.Item>
      )}
      {props.name === "Sign Up" && (
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
            placeholder="Confirm Password"
            className="bg-white"
          />
        </Form.Item>
      )}
      <Button
        type="primary"
        loading={props.loading}
        htmlType="submit"
        className={`w-full ${
          props.name === "Update" ? "bg-[#334155] hover:bg-[#334155cc]" : null
        }`}
      >
        {props.name}
      </Button>
    </Form>
  );
}

export default FormComponent;
