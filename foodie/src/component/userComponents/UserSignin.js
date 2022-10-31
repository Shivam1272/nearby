import React, { useState } from "react";

function UserSignin({ isVisible, onClose }) {
  const [user, setUser] = useState({
    name: "",
    contactNo: "",
    city: "",
    password: "",
  });

  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  let handleClick = async (e) => {
    e.preventDefault();
    const { name, contactNo, city, password } = user;

    let res = await fetch(`/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        contactNo,
        password,
        city,
      }),
    });

    let data = await res.json();
    console.log(data);
    if (data.success === false) {
      window.alert("Invalid Registration");
    } else {
      onClose();
    }
  };

  if (!isVisible) return null;
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex flex-col items-center h-screen z-50">
        <div className="mt-20 flex items-center justify-center">
          <div className="container h-[460px] w-96 bg-white bg-opacity-10 rounded-2xl shadow-5xl relative z-2 border border-opacity-30 border-r-0 border-b-0 backdrop-filter ">
            <div
              className="px-4 pt-2 hover:cursor-pointer text-white"
              onClick={onClose}
            >
              close X
            </div>
            <form
              method="POST"
              className="h-full flex flex-col justify-evenly items-center"
            >
              <div className="text-white font-poppins text-2xl tracking-widest">
                Sign in form for User
              </div>
              <input
                id="username"
                type="text"
                name="name"
                placeholder="username"
                value={user.name}
                onChange={handleInput}
                className="input-text outline-none rounded-lg px-2"
              />
              <input
                id="mobile"
                type="text"
                name="contactNo"
                placeholder="mobile no"
                value={user.contactNo}
                onChange={handleInput}
                className="input-text outline-none rounded-lg px-3"
              />
              <input
                id="city"
                type="text"
                name="city"
                placeholder="city"
                value={user.city}
                onChange={handleInput}
                className="input-text outline-none rounded-lg px-3"
              />
              <input
                id="password"
                type="password"
                name="password"
                placeholder="password"
                value={user.password}
                onChange={handleInput}
                className="input-text outline-none rounded-lg px-3"
              />
              <button
                className="cursor-pointer font-poppins rounded-full px-5 py-1 bg-white bg-opacity-50 hover:bg-white hover:bg-opacity-80 "
                onClick={handleClick}
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserSignin;
