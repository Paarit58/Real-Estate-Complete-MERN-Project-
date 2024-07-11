import React, { useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Fail, Success } from "../redux/user/userSlice";
import axios from "axios";

function Oauth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const onClick = async () => {
    try {
      setLoading(true);
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      const response = await axios.post(
        "/api/v1/user/googleSignin",
        {
          username: result.user.displayName,
          email: result.user.email,
          avatar: result.user.photoURL,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);
      dispatch(Success(response.data.data));
      navigate("/" , {replace: true})
    } catch (error) {
      setLoading(false);
      dispatch(Fail());
      console.log(error)
    }
  };

  return (
    <Button
      type="primary"
      className="w-full bg-red-600 hover:bg-red-500 text-white mt-2 "
      onClick={onClick}
      loading={loading}
    >
      Continue with GOOGLE
    </Button>
  );
}

export default Oauth;
