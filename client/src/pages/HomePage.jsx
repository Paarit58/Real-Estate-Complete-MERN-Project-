import React, { useEffect, useState } from "react";
import { Button, Carousel, Spin } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ListingItem from "../component/ListingItem";
import HomePageSection from "../component/HomePageSection";

function HomePage() {
  const [loading,setLoading]= useState(false)
  const [offerListing, setOfferListing] = useState(null);
  const [rentListing, setRentListing] = useState(null);
  const [saleListing, setSaleListing] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true)
      try {
        const responseOffer = await axios.get(
          "/api/v1/listing?offer=true&limit=4"
        );
        console.log(responseOffer);
        setOfferListing(responseOffer.data.data);

        const responseRent = await axios.get(
          "/api/v1/listing?type=rent&limit=4"
        );
        setRentListing(responseRent.data.data);

        const responseSale = await axios.get(
          "/api/v1/listing?type=sale&limit=4"
        );

        setSaleListing(responseSale.data.data);
        setLoading(false)
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
    };
    fetchListings();
  }, []);

  // console.log(offerListing.data)

  return (
    <>
      {offerListing && rentListing && saleListing && (
        <>
          <div className="hero ">
            <div className="hero-top max-w-[700px] m-auto py-20 flex flex-col gap-6">
              <div className="bold font-extrabold text-4xl">
                <p>
                  Find your next
                  <span className="text-slate-500"> perfect</span>
                </p>
                <p>place with ease</p>
              </div>
              <div className="light text-xs text-slate-500">
                <p>
                  Sahand Estate will help you find your home fast, easy and
                  comfortable.
                </p>
                <p>Our expert support are always available.</p>
              </div>
              <div className="link">
                <Button
                  type="link"
                  onClick={() => {
                    navigate("/search");
                  }}
                  className="hover:underline font-semibold text-xs p-0"
                >
                  Let's start now...{" "}
                </Button>
              </div>
            </div>
            <div className="hero-bottom mb-10">
              <Carousel draggable arrows>
                {offerListing.data.map((listing, index) => {
                  return (
                    <img
                      className="h-96 object-cover"
                      key={index}
                      src={listing.imageUrls[0]}
                      alt="House Image"
                    />
                  );
                })}
              </Carousel>
            </div>
          </div>
          <div className="main-section max-w-[800px] m-auto flex flex-col gap-8 pb-6">
            <div className="offer-section">
              <HomePageSection
                title="Recent Offers"
                link="Show more offers"
                listings={{ ...offerListing }}
                sectionType='offer'
              />
            </div>
            <div className="rent-section">
              <HomePageSection
                title="Recent places for rent"
                link="Show more places for rent"
                listings={{ ...rentListing }}
                sectionType='rent'
              />
            </div>
            <div className="sale-section">
              <HomePageSection
                title="Recent places for sale"
                link="Show more places for sale"
                listings={{ ...saleListing }}
                sectionType='sale'
              />
            </div>
          </div>
        </>
      )}
      <Spin fullscreen spinning={loading}></Spin>
    </>
  );
}

export default HomePage;
