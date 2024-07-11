import React, { useEffect, useRef, useState } from "react";
import { Button, Checkbox, Divider, Form, Input, Radio, Select } from "antd";
import axios from "axios";
import ListingItem from "../component/ListingItem";
import { useSelector, useDispatch } from "react-redux";
import { SetQuery } from "../redux/user/userSlice";

function SearchPage() {
  const [result, setResult] = useState();
  const dispatch = useDispatch();
  const userQuery = useSelector((state) => state.user.userQuery);
  const ref = useRef(0);

  const [formData, setFormData] = useState({
    search: userQuery ? userQuery.search : "",
    sale: userQuery ? userQuery.sale : false,
    rent: userQuery ? userQuery.rent : false,
    offer: userQuery ? userQuery.offer : false,
  });

  const [queryString, setQueryString] = useState(null);

  const onFinish = (values) => {
    const filterValues= {...values, search:formData.search}
    setQuery(filterValues);
  };

  const setQuery = (values) => {
    const formValues = { ...values };
    console.log(formValues)
    Object.keys(formValues).forEach((key) => {
      if (
        values[key] == undefined ||
        values[key] === false ||
        values[key] === "" ||
        values[key] === "both" ||
        key === "rent" ||
        key === "sale"
      ) {
        delete formValues[key];
      }
    });
    console.log(formValues)

    const queryStr = new URLSearchParams(formValues).toString();
    console.log(queryStr)
    setQueryString(queryStr);
  };

  const fetchResult = async () => {
    const url = queryString
      ? `/api/v1/listing/?${queryString}`
      : "/api/v1/listing?sort=createdAt";

    try {
      const response = await axios.get(url);
      console.log(response);
      dispatch(SetQuery(null));

      setResult(response.data.data.data);
    } catch (error) {
      dispatch(SetQuery(null));
      console.log(error);
    }
  };

  useEffect(() => {
    ref.current += 1;
    console.log(ref.current);
    if (userQuery) {
      console.log(userQuery)
      setFormData((pre) => ({ ...pre, ...userQuery }));

      setQuery({ ...userQuery });
    }
    console.log(formData);
    fetchResult();
  }, [queryString, userQuery]);

  console.log(formData)

  return (
    <div className="flex flex-col sm:flex-row">
      <div className="filter-section p-7 border-b-2 sm:border-r-2 sm:border-gray-300 sm:min-h-screen">
        <Form
          name="Search"
          variant="borderless"
          className="w-fit m-auto sm:w-64"
          onFinish={onFinish}
        >
          <div className="search-term flex items-baseline gap-2">
            <p>Search Term:</p>
            {/* <Form.Item name={"search"} initialValue={formData.search}> */}
              <Input
                placeholder="Search..."
                variant="borderless"
                className="bg-white"
                value={formData.search}
                onChange={(e) =>
                  setFormData((pre) => ({ ...pre, search: e.target.value }))
                }
              />
            {/* </Form.Item> */}
          </div>

          <div className="type flex items-baseline gap-2">
            <span>Type :</span>
            <Form.Item
              name={"type"}
              initialValue={
                formData.sale ? "sale" : formData.rent ? "rent" : "both"
              }
            >
              <Radio.Group>
                <Radio value={"both"}>Both</Radio>
                <Radio
                  value={"sale"}
                  checked={formData.sale}
                  onChange={(pre) => ({ ...pre, sale: !formData.sale })}
                >
                  Sale
                </Radio>
                <Radio
                  value={"rent"}
                  checked={formData.rent}
                  onChange={(pre) => ({ ...pre, rent: !formData.rent })}
                >
                  Rent
                </Radio>
              </Radio.Group>
            </Form.Item>
          </div>

          <Form.Item
            name="offer"
            valuePropName="checked"
            initialValue={formData.offer}
          >
            <Checkbox
              checked={formData.offer}
              onChange={(pre) => ({ ...pre, offer: !offer })}
            >
              Offer
            </Checkbox>
          </Form.Item>
          <div className="amenities flex items-baseline gap-2">
            <span>Amenities: </span>
            <Form.Item name={"parking"} valuePropName="checked">
              <Checkbox>Parking</Checkbox>
            </Form.Item>
            <Form.Item name={"furnished"} valuePropName="checked">
              <Checkbox>Furnished</Checkbox>
            </Form.Item>
          </div>
          <div className="sort flex items-baseline gap-2">
            <span>Sort: </span>
            <Form.Item name={"sort"}>
              <Select
                options={[
                  { value: "createdAt", label: <span>Latest</span> },
                  { value: "-createdAt", label: <span>Oldest</span> },
                  {
                    value: "regularPrice",
                    label: <span>Price Low to High</span>,
                  },
                  {
                    value: "-regularPrice",
                    label: <span>Price High to Low</span>,
                  },
                ]}
                className="bg-white rounded-md w-40"
                defaultValue={"createdAt"}
              ></Select>
            </Form.Item>
          </div>
          <Button type="primary" htmlType="submit" className="w-full">
            Search
          </Button>
        </Form>
      </div>

      <div className="content-section flex-grow px-7 mb-5">
        <div>
          <h3 className="text-2xl font-semibold my-6">Listing Results: </h3>
        </div>
        <Divider />
        <div className="flex flex-wrap gap-3">
          {result &&
            result.map((data, index) => (
              <ListingItem key={index} listing={data} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
