import React, { useEffect, useState } from "react";
import { Button } from "antd";
import axios from "axios";
import YourListingComponent from "./YourListingComponent";

function ShowListing({ user }) {
  const [showListing, setShowListing] = useState(false);
  const [listings, setListings] = useState(null);
  const [triggerDelete, setTriggerDelete]= useState(false)
  useEffect(() => {
    const fetchYourListings = async () => {
      if (showListing) {
        try {
          const response = await axios.get(`/api/v1/listing/?user=${user._id}`);
          console.log(response);
          setListings(response.data.data.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchYourListings();
  }, [user._id, showListing, triggerDelete]);

  return (
    <div className="text-center">
      {!showListing && (
        <Button
          type="link"
          className="text-green-700  hover:text-green-600 "
          onClick={() => {
            setShowListing(true);
          }}
        >
          Show listings
        </Button>
      )}
      {showListing && (
        <div className="mt-4 mb-7">
          <h4 className="font-semibold mb-3 ">Your Listings</h4>
          {listings &&
            listings.map((listing) => (
              <YourListingComponent listing={listing} key={listing._id} setTriggerDelete={setTriggerDelete} />
            ))}
          <Button
            danger
            type="link"
            className="mt-3 "
            onClick={() => {
              setShowListing(false);
            }}
          >
            Hide Listing
          </Button>
        </div>
      )}
    </div>
  );
}

export default ShowListing;
