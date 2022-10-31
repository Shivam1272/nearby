import React, { useState } from "react";
import { Link } from "react-router-dom";
import Register from "./Register";

function Navbar() {
  let [showRegister, setshowRegister] = useState(false);

  let handleOnClose = () => {
    setshowRegister(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center p-4 bg-orange-300">
        <div className="flex justify-between font-bold">
          <div className="px-3">
            <i className="fa fa-bowl-food" />
          </div>
          <Link to="/">
            <h1>nearBy</h1>
          </Link>
        </div>
        <div className="flex justify-between font-bold">
          <button
            className="px-3 hover:text-white hover:border-b-2"
            onClick={() => {
              setshowRegister(true);
            }}
          >
            Register
          </button>
          {/* <button
            className="px-3 hover:text-white hover:border-b-2"
            onClick={() => {
              setshowSignin(true);
            }}
          >
            Sign in
          </button> */}
        </div>
      </div>
      <Register isVisible={showRegister} onClose={handleOnClose} />
    </div>
  );
}

export default Navbar;
