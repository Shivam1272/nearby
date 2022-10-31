import React, { useState } from "react";
import Login from "./VendorComponents/Login";
import Signin from "./VendorComponents/Signin";
import UserLogin from "./userComponents/UserLogin";
import UserSignin from "./userComponents/UserSignin";
import ReactCardFlip from "react-card-flip";

function Register({ isVisible, onClose }) {
  let [showSignin, setshowSignin] = useState(false);
  let [showLogin, setshowLogin] = useState(false);
  let [showUserSignin, setshowUserSignin] = useState(false);
  let [showUserLogin, setshowUserLogin] = useState(false);
  const [isFlipped, setisFlipped] = useState(true);

  let handleOnClose = () => {
    setshowLogin(false);
    setshowSignin(false);
    setshowUserLogin(false);
    setshowUserSignin(false);
  };

  const handleClick = () => {
    setisFlipped(!isFlipped);
  };

  if (isVisible) {
    return (
      <>
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex flex-col items-center h-screen z-50">
          <div className="mt-20 flex flex-col items-start justify-center mb-8 z-50">
            <div
              className="p-5 hover:cursor-pointer text-white "
              onClick={onClose}
            >
              close X
            </div>
          </div>
          <ReactCardFlip
            isFlipped={isFlipped}
            flipDirection="horizontal"
            className="z-50"
          >
            <div>
              <div className="container h-96 w-96 bg-white bg-opacity-70 rounded-2xl shadow-5xl relative  border border-opacity-30 border-r-0 border-b-0 backdrop-filter m-1 ">
                <div className="flex flex-col justify-center items-center">
                  <h1 className="font-bold text-2xl text-black p-5 flex justify-center items-center m-3">
                    Register as Vendor
                  </h1>
                  <div>
                    <i
                      className="fa fa-user"
                      style={{ fontSize: 150, color: "white" }}
                    />
                  </div>
                  <div className="flex justify-center items-center p-2 mt-5">
                    <button
                      className="px-5 py-2 bg-lime-400 font-bold text-white m-1 rounded-2xl hover:bg-white hover:text-black"
                      onClick={() => {
                        setshowLogin(true);
                      }}
                    >
                      Log in
                    </button>
                    <button
                      className="px-5 py-2 bg-orange-400 font-bold text-white m-1 rounded-2xl hover:bg-white hover:text-black"
                      onClick={() => setshowSignin(true)}
                    >
                      Signin
                    </button>
                  </div>
                  <div className="flex justify-center items-center p-2 ">
                    <button
                      className="bg-lime-400 p-2 rounded-2xl  font-bold text-black hover:bg-white mb-2"
                      onClick={handleClick}
                    >
                      Register For User
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="container h-96 w-96 bg-white bg-opacity-70 rounded-2xl shadow-5xl relative border border-opacity-30 border-r-0 border-b-0 backdrop-filter m-1 ">
                <div className="flex flex-col justify-center items-center">
                  <h1 className="font-bold text-2xl text-black p-5 flex justify-center items-center m-3">
                    Register as User
                  </h1>
                  <div>
                    <i
                      className="fa fa-user"
                      style={{ fontSize: 150, color: "white" }}
                    />
                  </div>
                  <div className="flex justify-center items-center p-2 mt-5">
                    <button
                      className="px-5 py-2 bg-lime-400 font-bold text-white m-1 rounded-2xl hover:bg-white hover:text-black"
                      onClick={() => {
                        setshowUserLogin(true);
                      }}
                    >
                      Log in
                    </button>
                    <button
                      className="px-5 py-2 bg-orange-400 font-bold text-white m-1 rounded-2xl hover:bg-white hover:text-black"
                      onClick={() => {
                        setshowUserSignin(true);
                      }}
                    >
                      Signin
                    </button>
                  </div>
                  <div className="flex justify-center items-center p-2 ">
                    <button
                      className="bg-lime-400 p-2 rounded-2xl  font-bold text-black hover:bg-white"
                      onClick={handleClick}
                    >
                      Register For Vendor
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </ReactCardFlip>
        </div>
        <Login isVisible={showLogin} onClose={handleOnClose} />
        <Signin isVisible={showSignin} onClose={handleOnClose} />
        <UserLogin isVisible={showUserLogin} onClose={handleOnClose} />
        <UserSignin isVisible={showUserSignin} onClose={handleOnClose} />
      </>
    );
  }
}
export default Register;
