import { Button, Input } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;

function ContactLandlord({ listing }) {
  const [message, setMessage] = useState(null);
  const [landLord, setLandLord] = useState(null);
  const [contact, setContact] = useState(false);

  useEffect(() => {
    const fetchLandLord = async () => {
      try {
        const response = await axios.get(`/api/v1/user/${listing.user}`);
        setLandLord(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandLord();
  }, [listing.user]);

  const onClick = () => {
    const link = `mailto:${landLord.email}?subject=Regarding ${listing.name}&body=${message}`;
    window.location.href = link;
  };

  return (
    <>
      {!contact && (
        <div className="contact">
          <Button
            type="primary"
            onClick={() => {
              setContact(true);
            }}
            className="bg-blue-800 w-full my-6 hover:bg-blue-700"
          >
            CONTACT LANDLORD
          </Button>
        </div>
      )}
      {contact && landLord && (
        <div className="my-3">
          <TextArea
            placeholder="Enter your message here..."
            rows={4}
            variant="borderless"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="bg-white"
          />

          <Button
            className="bg-blue-800 text-white w-full my-2 hover:bg-blue-700"
            onClick={onClick}
          >
            Send Message
          </Button>
          <div className="text-right ">
            <Button type="link" onClick={() => setContact(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default ContactLandlord;
