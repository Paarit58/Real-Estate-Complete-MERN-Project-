import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ListingItem from "./ListingItem";
import { useDispatch } from "react-redux";
import { SetQuery } from "../redux/user/userSlice";
import { Button } from "antd";

function HomePageSection({ title, link, listings, sectionType }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div>
      <h4 className="font-semibold">{title}</h4>
      <Button
        type="link"
        onClick={() => {
          sectionType === "offer"
            ? dispatch(SetQuery({ [sectionType]: true }))
            : dispatch(SetQuery({ type: sectionType }));

          navigate("/search");
        }}
        className="p-0"
      >
        <span className="text-blue-600 text-xs hover:underline">{link}</span>
      </Button>

      <div className=" m-auto flex flex-wrap gap-3">
        {listings.data.map((listing, index) => (
          <ListingItem key={index} listing={listing} />
        ))}
      </div>
    </div>
  );
}

export default HomePageSection;
