import {
  Button,
  Checkbox,
  Flex,
  Form,
  Input,
  InputNumber,
  Radio,
  message,
} from "antd";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import React, { useEffect, useRef, useState } from "react";
import { app } from "../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function EditListingPage() {
  const [offer, setOffer] = useState(undefined);
  const [regularPrice, setRegularPrice] = useState(3);
  const [files, setFiles] = useState();
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState(null);
  const navigate = useNavigate();

  const imageUrls = useRef([]);
  const params = useParams();

  const handleUpload = () => {
    const storage = getStorage(app);
    console.log(imageUrls.current);
    files.forEach((file) => {
      const fileName = Date.now() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          message.error(`${file.name} failed to uplaod`);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            imageUrls.current.push(downloadUrl);
            // console.log(imageUrls);

            // setProgress(null);
            message.success(`${file.name} uploaded successfully!!`);
          });
        }
      );
    });
  };

  const onFinish = async (values) => {
    let formData = { ...values, imageUrls: listing.imageUrls };
    console.log(formData);
    try {
      setLoading(true);
      const response = await axios.patch(
        `/api/v1/listing/${params.listingId}`,
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const listingId = response.data.data._id;

      setLoading(false);
      console.log(response);
      navigate(`/listing/${listingId}`);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchlisting = async () => {
      try {
        const response = await axios.get(`/api/v1/listing/${params.listingId}`);
        console.log(response);
        setListing(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchlisting();
  }, []);

  return (
    <div>
      <h3 className="text-2xl font-semibold text-center my-6">
        Edit A Listing
      </h3>
      <div className="w-fit m-auto px-4">
        {listing && (
          <Form
            name="Create Listing"
            // className="sm:w-96 "
            onFinish={onFinish}
            initialValues={{
              name: listing.name,
              address: listing.address,
              description: listing.description,
              type: listing.type,
              bedrooms: listing.bedrooms,
              bathrooms: listing.bathrooms,
              regularPrice: listing.regularPrice,
              parking: listing.parking,
              furnished: listing.furnished,
              offer: listing.offer,
              discountPrice: listing.discountPrice,
            }}
            // onFinishFailed={onFinishFailed}
            variant="borderless"
          >
            <div className="flex flex-col sm:flex-row sm:gap-10">
              <div>
                <FormItem
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please provide name!",
                    },
                  ]}
                >
                  <Input className="bg-white" placeholder="Name" />
                </FormItem>
                <FormItem
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: "Please provide description!",
                    },
                  ]}
                >
                  <TextArea className="bg-white" placeholder="Description" />
                </FormItem>
                <FormItem
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: "Please provide address!",
                    },
                  ]}
                >
                  <Input className="bg-white" placeholder="Address" />
                </FormItem>

                <span className="font-semibold">Type :</span>
                <Form.Item name={"type"}>
                  <Radio.Group>
                    <Radio value={"sale"}>Sale</Radio>
                    <Radio value={"rent"}>Rent</Radio>
                  </Radio.Group>
                </Form.Item>

                <Flex>
                  <Form.Item name="parking" valuePropName="checked">
                    <Checkbox>Parking spot</Checkbox>
                  </Form.Item>
                  <Form.Item name="furnished" valuePropName="checked">
                    <Checkbox>Furnished</Checkbox>
                  </Form.Item>
                  <Form.Item name="offer" valuePropName="checked">
                    <Checkbox
                      checked={offer}
                      onChange={(e) => {
                        console.log(e);
                        setOffer(e.target.checked);
                      }}
                    >
                      Offer
                    </Checkbox>
                  </Form.Item>
                </Flex>

                <Flex gap="large">
                  <Flex gap={2} align="baseline">
                    <FormItem name="bedrooms">
                      <InputNumber className="bg-white" min={1} max={5} />
                    </FormItem>
                    <span className="px-2">Beds</span>
                  </Flex>
                  <Flex gap={2} align="baseline">
                    <FormItem name={"bathrooms"}>
                      <InputNumber className="bg-white" min={1} max={10} />
                    </FormItem>
                    <span className="px-2">Baths</span>
                  </Flex>
                </Flex>
                <Flex gap={2} align="baseline">
                  <FormItem
                    name={"regularPrice"}
                    rules={[
                      {
                        required: true,
                        message: "Please provide regular price!",
                      },
                    ]}
                  >
                    <InputNumber
                      className="bg-white"
                      min={100}
                      max={1000000}
                      value={regularPrice}
                      onChange={(value) => setRegularPrice(value)}
                    />
                  </FormItem>
                  <span className="px-2">Regular Price</span>
                </Flex>
                {offer && (
                  <Flex gap={2} align="baseline">
                    <FormItem
                      name="discountPrice"
                      rules={[
                        {
                          required: true,
                          message: "Please provide discount price!",
                        },
                      ]}
                    >
                      <InputNumber
                        className="bg-white"
                        min={1}
                        max={regularPrice - 1}
                      />
                    </FormItem>
                    <span className="px-2">Discounted Price</span>
                  </Flex>
                )}
              </div>

              <div className="min-w-60">
                <div className="w-full">
                  <span className="font-semibold">Images :</span>
                  <span> The first image will be the cover (max 6)</span>
                </div>
                <Flex gap={"small"} align="baseline">
                  {/* <FormItem name="Files" > */}
                  <Input
                    className="bg-white"
                    type="File"
                    multiple
                    onChange={(e) => {
                      console.log(typeof e.target.files),
                        setFiles(Object.values(e.target.files));
                    }}
                  />
                  {/* </FormItem> */}
                  <Button
                    className="bg-green-600 text-white"
                    onClick={handleUpload}
                  >
                    Upload
                  </Button>
                </Flex>

                <Button
                  type="primary"
                  className="bg-blue-950 w-full my-3"
                  htmlType="submit"
                >
                  Update Listing
                </Button>
              </div>
            </div>
          </Form>
        )}
      </div>
    </div>
  );
}

export default EditListingPage;
