import { Button, Card, message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function YourListingComponent({ listing, setTriggerDelete }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const onEdit = () => {
    navigate(`/edit-listing/${listing._id}`);
  };
  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`api/v1/listing/${listing._id}`);
      setLoading(false);
      message.success(`Listing "${listing.name}" has been deleted!!!`)
      setTriggerDelete((pre) => !pre);
      
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <div className="my-2">
      <Card hoverable>
        <div className="flex items-center justify-between">
          <img src={listing.imageUrls[0]} width={100} alt="House Image" />
          <span className="font-semibold text-xs">{listing.name}</span>
          <div className="flex flex-col">
            <Button type="link" onClick={onEdit}>
              Edit
            </Button>
            <Button danger type="link" onClick={onDelete}>
              {loading ? "Deleting" : "Delete"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default YourListingComponent;
