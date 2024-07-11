import {
  Button,
  Carousel,
  Image,
  List,
  Space,
  Spin,
  Tag,
  Typography,
} from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaBath, FaBed, FaChair, FaParking } from "react-icons/fa";
import ContactLandlord from "../component/ContactLandlord";
import { useSelector } from "react-redux";

function ListingPage() {
  const [Listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const currentUser = useSelector((state) => state.user.currentUser);

  const params = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await axios.get(`/api/v1/listing/${params.listingId}`);
        // console.log(response.data);

        setListing(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListing();
  }, [params.listingId]);

  console.log("Listing:", Listing);

  return (
    <div>
      {Listing && (
        <>
          <Carousel draggable arrows>
            {Listing.imageUrls.map((url, index) => {
              return (
                <img
                  className="h-96 object-cover"
                  key={index}
                  src={url}
                  alt="House Image"
                />
              );
            })}
          </Carousel>

          <div className="m-auto max-w-[600px] pb-10">
            <div className="my-4">
              <span className="text-lg font-semibold">
                <Space>
                  <span>{Listing.name}</span>
                  <span>
                    <span>-${Listing.regularPrice}</span>
                    {Listing.type === "rent" && <span>/month</span>}
                  </span>
                </Space>
              </span>
            </div>
            <div className="location text-xs text-slate-600 flex gap-1">
              <EnvironmentOutlined />
              <span>{Listing.address}</span>
            </div>
            <div className="type-offer">
              <Tag className="w-32 text-center bg-red-900 text-white">
                For {Listing.type === "rent" ? "Rent" : "Sale"}
              </Tag>
              {Listing.offer && (
                <Tag className="w-32 text-center bg-green-800 text-white">
                  ${Listing.discountPrice.toLocaleString()} discount
                </Tag>
              )}
            </div>
            <div className="description text-xs text-justify">
              <span className="font-semibold ">Description: </span>
              <span>{Listing.description}</span>
            </div>
            <div className="amenities flex text-xs text-green-900 font-semibold gap-4">
              <div className="beds flex gap-1 items-center mt-2">
                <FaBed />
                <span>{Listing.bedrooms} Beds</span>
              </div>
              <div className="baths flex gap-1 items-center mt-2">
                <FaBath />
                <span>{Listing.bathrooms} Baths</span>
              </div>
              {Listing.parking && (
                <div className="parking flex gap-1 items-center mt-2">
                  <FaParking />
                  <span>Parking Spot</span>
                </div>
              )}
              {Listing.furnished && (
                <div className="furnished flex gap-1 items-center mt-2">
                  <FaChair />
                  <span>Furnished</span>
                </div>
              )}
            </div>

            {currentUser._id!==Listing.user && <ContactLandlord listing={Listing} />}
          </div>
        </>
      )}
      <Spin tip="Loading" size="large" fullscreen spinning={loading} />
    </div>
  );
}

export default ListingPage;
