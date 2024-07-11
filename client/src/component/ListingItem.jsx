import { Card, Typography } from "antd";
import React from "react";
import { EnvironmentOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function ListingItem({ listing }) {
  const navigate= useNavigate()
  const onClick=(e)=>{
    navigate(`/listing/${listing._id}`)
  }
  return (
    <>
      <Card
        cover={
         
          <img
            src={listing.imageUrls[0]}
            alt="House Image"
            className="object-cover h-40"
          />
          
        }
        hoverable
        size="small"
        onClick={onClick}
        // type="inner"
        className="flex-grow w-64 p-0"
      >
        <div>
          <h5 className="font-[550] text-xs">{listing.name}</h5>
          <div className="location text-[10px] my-2">
            <EnvironmentOutlined className="text-green-500" />
            <span className="text-slate-500">{listing.address}</span>
          </div>
          <div className="description my-2">
            <Typography.Paragraph
              className="text-[10px] text-slate-500"
              ellipsis={{ rows: 2 }}
            >
              {listing.description}
            </Typography.Paragraph>
          </div>
          <div className="price">
            <span className="text-slate-600 text-xs">
              ${listing.discountPrice.toLocaleString()}
            </span>
          </div>
          <div className="amenities flex gap-7 text-[10px] font-semibold mt-2">
            <div className="bedrooms">
            <span>{listing.bedrooms}</span>
            <span> Bed</span>
            </div>
            <div className="bathrooms">
            <span>{listing.bathrooms}</span>
            <span> Baths</span>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}

export default ListingItem;
