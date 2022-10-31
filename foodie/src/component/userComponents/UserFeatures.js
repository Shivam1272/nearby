import React, { useState, useEffect } from "react";

function Features({ user, visible, profile, onClose }) {
  let [userDetail, setuser] = useState();
  useEffect(() => {
    setuser(user);
  }, [user]);
  if (!visible) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm justify-center rounded-3xl flex flex-col m-5">
      <div
        className="px-5 py-2 flex flex-end justify-center w-24 cursor-pointer bg-white m-2 rounded-3xl hover:bg-red-500"
        onClick={onClose}
      >
        close X
      </div>
      {/* HEADING */}
      <div className=" rounded-2xl flex justify-around bg-white m-2">
        {/* CONTENT */}
        <div className="pt-3 z-50">
          <Profile visible={profile} users={userDetail} />
        </div>
      </div>
    </div>
  );
}

export default Features;

function Profile({ visible, users }) {
  const userData = users;
  useEffect(() => {}, [users]);

  if (!visible) return null;
  return (
    <>
      <div>
        <div className="flex justify-center items-center bg-orange-400 rounded-2xl p-2 text-white font-bold">
          Personal Deatil
        </div>
        <div className="m-2 rounded-lg flex flex-col justify-evenly">
          {/* <div className="flex justify-between items-center">
            <h1 className=" font-mono font-bold text-lg">Edit</h1>
          </div> */}
          <div className="flex flex-col">
            <div className="flex justify-between items-center my-2">
              <label className="font-bold text-sm">
                <i className="fa fa-user" />
                <span className="p-2">Name</span>
              </label>
              <span>{userData.name}</span>
            </div>
            <div className="flex justify-between items-center my-2">
              <label className="font-bold text-sm">
                <i className="fa fa-phone" />
                <span className="p-2">Contact No.</span>
              </label>
              <span>{userData.contactNo}</span>
            </div>
            <div className="flex justify-between items-center my-2">
              <label className="font-bold text-sm">
                <i className="fa fa-location" />
                <span className="p-2">City</span>
              </label>
              <label>{userData.city}</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
