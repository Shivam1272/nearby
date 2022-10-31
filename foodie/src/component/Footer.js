import React from "react";

function Footer() {
  return (
    <>
      <div className="bg-gray-50 flex md:flex-row flex-col justify-around items-start p-20">
        <div className="p-5 ">
          <ul>
            <p className="text-gray-800 font-bold text-3xl pb-6">nearBy</p>
            <div className="flex gap-6 pb-5">
              <i className="fa fa-facebook-f text-2xl cursor-pointer hover:text-blue-600" />
              <i className="fa fa-twitter text-2xl cursor-pointer hover:text-blue-600" />
              <i className="fa fa-instagram text-2xl cursor-pointer hover:text-pink-600" />
              <i className="fa fa-youtube text-2xl cursor-pointer hover:text-red-600" />
            </div>
          </ul>
        </div>
        <div className="p-5">
          <ul>
            <p className="text-gray-800 font-bold text-2xl pb-4">Company</p>
            <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
              About
            </li>
            <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
              Products
            </li>
            <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
              Pricing
            </li>
            <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
              Careers
            </li>
            <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
              Press & Media
            </li>
          </ul>
        </div>
        <div className="p-5">
          <ul>
            <p className="text-gray-800 font-bold text-2xl pb-4">Support</p>
            <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
              Contact
            </li>
            <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
              Support Portals
            </li>
            <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
              List Of Charges
            </li>
            <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
              Downloads & Resources
            </li>
            <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
              Videos
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center text-center  p-5 bg-gray-50">
        <h1 className=" text-gray-800 font-semibold">
          © 2022-2023 All rights reserved | Build with ❤ by{" "}
          <span className="hover:text-blue-600 font-semibold cursor-pointer">
            nearBy{" "}
          </span>
        </h1>
      </div>
    </>
  );
}

export default Footer;
