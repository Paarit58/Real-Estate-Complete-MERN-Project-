import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Typography, Input, Menu, Dropdown, Avatar } from "antd";
import {
  BarsOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  LoginOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { SetQuery } from "../redux/user/userSlice";

function Header() {
  const profileImage = useSelector((state) => state.user.profileImage);
  const menuItem = useRef({
    label: "Sign In",
    key: "sign-in",
    icon: <LoginOutlined />,
  });
  const [search, setSearch] = useState();

  const currentUser = useSelector((state) => state.user.currentUser);
  const query = useSelector((state) => state.user.userQuery);
  const dispatch = useDispatch();

  if (currentUser) {
    (menuItem.current.label = (
      <Avatar src={<img src={currentUser.avatar} alt="avatar" />} />
    )),
      (menuItem.current.key = "profile"),
      (menuItem.current.icon = null);
  }

  const navigate = useNavigate();
  const handleMenuclick = (item) => {
    console.log(window.location.pathname);
    navigate(item.key);
  };
  const items = [
    {
      label: "Home",
      key: "home",
      icon: <HomeOutlined />,
    },
    {
      label: "About",
      key: "about",
      icon: <InfoCircleOutlined />,
    },
    menuItem.current,
  ];

  const handleSearch = () => {
    console.log(search);
    dispatch(SetQuery({ search: search }));
    setSearch("");
    navigate("/search");
  };

  return (
    <header>
      <div className=" shadow-xl  bg-white">
        <div className="px-4 max-w-4xl h-14 m-auto  flex items-center justify-between ">
          <Link to={"/home"}>
            <div className="flex flex-wrap font-semibold">
              <span>Real</span>
              <span>Estate</span>
            </div>
          </Link>
          <Input
            placeholder="Search..."
            variant="borderless"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            onPressEnter={handleSearch}
            addonAfter={<SearchOutlined onClick={handleSearch} />}
            className="w-52 bg-gray-200 rounded-md shadow-sm"
          ></Input>
          <Menu
            onClick={handleMenuclick}
            defaultSelectedKeys={["home"]}
            selectedKeys={[window.location.pathname.split("/")[1]]}
            mode="horizontal"
            items={items}
            className="h-12 w-80 bg-transparent hidden border-none overflow-hidden md:flex"
          />
          <Dropdown
            menu={{
              items,
              selectable: true,
              defaultSelectedKeys: ["home"],
              selectedKeys: [window.location.pathname.split("/")[1]],
              onClick: handleMenuclick,
            }}
            className="md:hidden"
          >
            <BarsOutlined />
          </Dropdown>
        </div>
      </div>
    </header>
  );
}

export default Header;
