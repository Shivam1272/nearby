import React, { useState, useEffect } from "react";
import ReactCardFlip from "react-card-flip";
import { useNavigate } from "react-router-dom";

function ShopDetail({ vendor }) {
  let navigate = useNavigate();
  const [isFlipped, setisFlipped] = useState(true);
  let [imageUrl, setUrl] = useState();
  let [menuItem, setMenuItem] = useState();

  // load menu items
  const load_menu = async () => {
    let res = await fetch(`/vendors/${vendor._id}/get/menuItem`, {
      method: "GET",
    });

    let data = await res.json();
    if (data) {
      setMenuItem(data);
    }
  };

  // load menu image
  const load_pic = async () => {
    const url = `/vendors/documents/${vendor._id}/get/menuImage`;
    const options = {
      method: "GET",
    };
    let response = await fetch(url, options);
    const imageBlob = await response.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    setUrl(imageObjectURL);
  };

  useEffect(() => {
    load_pic();
    load_menu();
  }, []);

  const handleClick = () => {
    setisFlipped(!isFlipped);
  };

  let handleSubmit = () => {
    navigate("/takeaway", {
      state: { vendor: vendor, menuItem: menuItem, imageUrl: imageUrl },
    });
  };

  return (
    <>
      <ReactCardFlip
        isFlipped={isFlipped}
        flipDirection="horizontal"
        className="z-50"
      >
        <div className="flex flex-col justify-center items-center">
          <div className="">
            <img src={imageUrl} alt="Menu Card is not there!!" />
          </div>
          <div className="font-bold text-white flex justify-between items-center">
            <button
              className="bg-orange-400 rounded-2xl p-2 flex items-center justify-center mt-2 mx-1"
              onClick={() => {
                handleClick();
              }}
            >
              Shop Detail
            </button>
            <button
              disabled={!vendor.takeAwayOrderstatus.byVendor}
              className={`rounded-2xl p-2 flex justify-center items-center mt-2 mx-1 font-bold ${
                vendor.takeAwayOrderstatus.admin ? "bg-lime-400" : "bg-red-400"
              }`}
            >
              take away
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center w-full bg-slate-600">
          <div className="flex flex-col p-5 w-full rounded-lg shadow-lg">
            <div>
              <div className="flex justify-between items-center my-2">
                <span className="font-bold text-sm">Shop Name</span>
                <span className=" text-white">{vendor.shopName}</span>
              </div>
              <div className="flex justify-between items-center my-2">
                <span className="font-bold text-sm">City</span>
                <span className=" text-white">
                  {vendor.address.fulladdress}
                </span>
              </div>
              <div className="justify-between items-center my-2 flex flex-wrap w-full">
                {menuItem &&
                  menuItem.map((item) => {
                    return (
                      <span
                        key={item.foodName}
                        className=" text-white rounded-md shadow-md m-1 p-1 font-bold"
                      >
                        {item.foodName}
                      </span>
                    );
                  })}
              </div>
            </div>
            <div className="text-white flex flex-col  w-full justify-between mt-2 ">
              <div className="bg-orange-400 rounded-2xl p-2 flex items-center justify-center mt-2">
                <i className="fa-regular fa-pot-food" />
                <button
                  className="font-bold pl-2"
                  onClick={() => {
                    handleClick();
                  }}
                >
                  Menu Card
                </button>
              </div>
              <div className="">
                <button
                  disabled={!vendor.takeAwayOrderstatus.byVendor}
                  className={`w-full rounded-2xl p-2 flex justify-center items-center mt-2 font-bold ${
                    vendor.takeAwayOrderstatus.admin
                      ? "bg-lime-400"
                      : "bg-red-400"
                  }`}
                  onClick={handleSubmit}
                >
                  take away
                </button>
              </div>
            </div>
          </div>
        </div>
      </ReactCardFlip>
    </>
  );
}

export default ShopDetail;
