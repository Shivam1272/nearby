import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import UserFeatures from "./UserFeatures";
import { Menu, Transition } from "@headlessui/react";
import Map from "../Map";
import geoLocation from "../../utils/geoLocation";

function UserHome() {
  let location = useLocation();
  let navigate = useNavigate();
  let [city, setCity] = useState();
  let [help, setShowHelp] = useState(false);
  let [latitude, setLatitude] = useState(0);
  let [userData, setuserData] = useState();
  let [about, setShowAbout] = useState(false);
  let [longitude, setLongitude] = useState(0);
  let [vendorData, setvendorData] = useState();
  let [profile, setShowProfile] = useState(true);
  let [userfeatures, setShowuserFeature] = useState(false);

  let logout = async () => {
    let res = await fetch("/users/logout", {
      method: "POST",
    });
    console.log(res);
    if (res.status === 200) {
      window.alert(res.message);
      navigate("/");
    }
  };

  let handleOnClose = () => {
    setShowuserFeature(false);
  };

  const setValue = async (data) => {
    setLatitude(data.latitude);
    setLongitude(data.longitude);
    setCity(data.city);
    let res = await fetch("/admin/vendors/all", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        shopLocation: {
          city: city,
        },
      }),
    });
    let data1 = await res.json();
    if (!data1) {
    } else {
      setvendorData(data1);
    }
  };

  useEffect(() => {
    setuserData(location.state.userDetail);
    geoLocation(setValue);
  }, [latitude, longitude, userData]);

  let handleClick = (item) => {
    if (item === "profile") {
      setShowHelp(false);
      setShowAbout(false);
      setShowProfile(true);
    } else if (item === "help") {
      setShowHelp(true);
      setShowAbout(false);
      setShowProfile(false);
    } else if (item === "about") {
      setShowAbout(true);
      setShowHelp(false);
      setShowProfile(false);
    }
    setShowuserFeature(true);
  };

  return (
    <>
      <div className="flex justify-between items-center p-4 bg-orange-300">
        {/* NAVBAR */}
        <div className="px-3 flex justify-between">
          <Link to="/userhome">
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
                      <Link to="/user/myorder">
                        <div
                          className={`p-2 ${
                            active ? "bg-lime-300" : "text-gray-700"
                          }`}
                        >
                          <i className="fa fa-burger" />
                          <span className="p-2">My Orders</span>
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
      <Map
        latitude={latitude}
        longitude={longitude}
        city={city}
        vendorData={vendorData}
      />
      <UserFeatures
        user={userData}
        visible={userfeatures}
        profile={profile}
        help={help}
        about={about}
        onClose={handleOnClose}
      />
    </>
  );
}
export default UserHome;
