import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Features from "./Features";
import { Menu, Transition } from "@headlessui/react";
import Map from "./Map";
import geoLocation from "../utils/geoLocation";

function VendorHome() {
  let location = useLocation();
  let navigate = useNavigate();
  let [city, setCity] = useState();
  let [bool, setBool] = useState();
  let [latitude, setLatitude] = useState(0);
  let [longitude, setLongitude] = useState(0);
  let [status, setStatus] = useState("is Close");
  let [profile, setShowProfile] = useState(true);
  let [shopLocation, setshopLocation] = useState();
  let [features, setShowFeature] = useState(false);
  let [document, setShowDocument] = useState(false);

  const [vendorData, setvendorData] = useState({});
  useEffect(() => {
    setvendorData(location.state.vendorDetail);
  }, [bool]);

  let handleOnClose = () => {
    setShowFeature(false);
  };

  let logout = async () => {
    let res = await fetch(`/vendors/logout`, {
      method: "POST",
    });
    console.log(res);
    if (res.status === 200) {
      window.alert(res.message);
      navigate("/");
    }
  };

  let isOpenClose = async (e) => {
    if (status === "is Close") {
      setStatus("is Open");
      setBool(false);
    } else {
      setStatus("is Close");
      setBool(true);
    }
    console.log(bool, longitude, latitude);
    // eslint-disable-next-line
    let res = await fetch(`/vendors/update/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        openOrClosedstatus: bool,
        shopLocation: {
          location: shopLocation,
          city: city,
        },
        addressCoords: {
          lat: latitude,
          long: longitude,
        },
      }),
    });
    let data = await res.json();
    setvendorData(data);
  };

  const setValue = (data) => {
    setCity(data.city);
    setLatitude(data.latitude);
    setLongitude(data.longitude);
    setshopLocation(data.shopLocation);
  };

  useEffect(() => {
    geoLocation(setValue);
  }, [latitude, longitude, shopLocation, city]);

  let handleClick = (item) => {
    if (item === "profile") {
      setShowProfile(true);
      setShowDocument(false);
    } else if (item === "guideliance") {
      setShowDocument(false);
      setShowProfile(false);
    } else if (item === "help") {
      setShowDocument(false);
      setShowProfile(false);
    } else if (item === "about") {
      setShowDocument(false);
      setShowProfile(false);
    } else if (item === "documents") {
      setShowProfile(false);
      setShowDocument(true);
    }
    setShowFeature(true);
  };

  return (
    <>
      <div className="flex justify-between items-center p-4 bg-orange-300">
        {/* NAVBAR */}
        <div className="px-3 flex justify-between">
          <Link to="/home">
            <i className="fa fa-bowl-food" />
            <span className="px-3 font-mono font-bold">nearBy</span>
          </Link>
        </div>
        <Menu
          as="div"
          className="flex z-50 justify-between hover:cursor-pointer relative"
        >
          {({ open }) => (
            <Fragment>
              <Menu.Button>
                <i className="fa fa-user" style={{ fontSize: 24 }} />
                <span className="px-3">Profile</span>
              </Menu.Button>
              <Transition
                show={open}
                enter="transform transition duration-100 ease-in"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transform transition duration-100 ease-in"
                leaveTo="opacity-0 scale-95"
                leaveFrom="opacity-100 scale-100"
              >
                <Menu.Items
                  className=" origin-top-right absolute right-0 mt-10 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
                  static
                >
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        className={`p-2 ${
                          active ? "bg-lime-300" : "text-gray-700"
                        }`}
                        onClick={() => {
                          handleClick("profile");
                        }}
                      >
                        <i className="fa fa-user" />
                        <span className="p-2">PROFILE</span>
                      </div>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        className={`p-2 ${
                          active ? "bg-lime-300" : "text-gray-700"
                        }`}
                        onClick={() => {
                          handleClick("documents");
                        }}
                      >
                        <i className="fa fa-file" />
                        <span className="p-2">My Documents</span>
                      </div>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link to="/vendor/order">
                        <div
                          className={`p-2 ${
                            active ? "bg-lime-300" : "text-gray-700"
                          }`}
                        >
                          <i className="fa fa-cookie" />
                          <span className="p-2">My Order</span>
                        </div>
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link to="/vendor/guideliance">
                        <div
                          className={`p-2 ${
                            active ? "bg-lime-300" : "text-gray-700"
                          }`}
                        >
                          <i className="fa fa-book" />
                          <span className="p-2">Guideliance</span>
                        </div>
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link to="/about">
                        <div
                          className={`p-2 ${
                            active ? "bg-lime-300" : "text-gray-700"
                          }`}
                        >
                          <i className="fa fa-people-group" />
                          <span className="p-2">About</span>
                        </div>
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        className={`p-2 ${
                          active ? "bg-lime-300" : "text-gray-700"
                        }`}
                      >
                        <i className="fa fa-right-from-bracket" />
                        <span className="p-2" onClick={logout}>
                          Log out
                        </span>
                      </div>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Fragment>
          )}
        </Menu>
      </div>
      <Map latitude={latitude} longitude={longitude} address={city} />
      <div className="flex flex-col lg:w-1/4 w-11/12 mx-auto my-4 p-5  justify-center bg-slate-600 rounded-lg text-white">
        <span>SHOP NAME {vendorData.shopName}</span>
        <span>SHOP OWNER NAME {vendorData.vendorName}</span>
        {/* <span>SHOP LOCATION {vendorData.address.city}</span> */}
        <span>SHOP {status}</span>
        <div className=" mt-2 flex justify-center items-center">
          <button className="rounded-3xl" onClick={isOpenClose}>
            SHOP {status}
          </button>
        </div>
      </div>
      <Features
        vendor={vendorData}
        visible={features}
        profile={profile}
        documents={document}
        onClose={handleOnClose}
      />
    </>
  );
}

export default VendorHome;
