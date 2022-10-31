import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function VendorDetail({
  shopName,
  name,
  addressName,
  openOrClosedstatus,
  menuItem,
  takeAwayOrderstatus,
}) {
  let navigate = useNavigate();

  let handleClick = () => {
    navigate("/shopdetail", {
      state: {
        shopName,
        name,
        openOrClosedstatus,
        addressName,
        menuItem,
        takeAwayOrderstatus,
      },
    });
  };

  useEffect(() => {}, [
    shopName,
    name,
    openOrClosedstatus,
    addressName,
    menuItem,
    takeAwayOrderstatus,
  ]);

  return (
    <div className="flex flex-col items-center bg-lime-400 text-white font-bold">
      <div className="p-1">
        <span>SHOP NAME: {shopName}</span>
        <br />
        <span>SHOP OWNER: {name}</span>
        <br />
        <span>SHOP LOCATION: {addressName}</span>
        <br />
        {{ openOrClosedstatus } ? (
          <span>SHOP is Open</span>
        ) : (
          <span>SHOP is Close</span>
        )}
      </div>
      <div className="felx justify-center items-center p-2">
        <button
          className=" bg-orange-500 rounded-lg text-white px-2 py-1"
          onClick={() => {
            handleClick();
          }}
        >
          see more detail
        </button>
      </div>
    </div>
  );
}

export default VendorDetail;
