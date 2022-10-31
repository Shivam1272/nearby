import React from "react";

function About() {
  return (
    <div className="p-2 space-y-5">
      <div className="p-2 flex justify-center items-center font-bold text-xl bg-orange-400">
        About Us
      </div>
      <div className="p-[30px] text-justify bg-lime-400 font-bold">
        <p>
          Online street food delivery 'nearBy' is a method for bringing
          customers and street food sellers together. Online food delivery
          businesses have increased as a result of the pandemic. There are
          numerous platforms available for doing this, however the service
          providers here are quite large restaurants, hotels, etc. What about
          street vendors? Here is where our vendor-focused model enters the
          picture. Our platform provides online street food product information
          of the street food sellers, assisting them in growing their
          businesses. Our app nearBy will display neighbouring food vendors'
          menu cards and online statuses. From our app, users can confirm their
          orders. We will also offer alternatives for takeaway orders. For both
          users and vendors, we will create distinct simple user interface apps.
        </p>
      </div>

      <h2 className="text-center text-xl font-bold">Our Team</h2>
      <div className="flex flex-col md:flex-row space-around w-full">
        <div className="flex flex-col rounded-2xl shadow-xl shadow-gray-400 mx-auto">
          <img src="./images/dev2.jpg" alt="Jane" className="w-100vw" />
          <div className="container p-8 text-center">
            <h2 className="text-black text-xl font-medium">Mahendra Yadav</h2>
            <p className="title text-black text-lg font-bold">R&D</p>
            <p>yadavmahendra@example.com</p>
            <p>
              <button className="button rounded-lg bg-orange-400 text-white px-4 py-2 mt-2">
                Contact
              </button>
            </p>
          </div>
        </div>
        <div className="flex flex-col rounded-xl shadow-lg shadow-gray-400 mx-auto">
          <img src="./images/dev2.jpg" alt="Jane" className="w-100vw" />
          <div className="container p-8 text-center">
            <h2 className="text-black text-xl font-medium">Shivam Patel</h2>
            <p className="title text-black text-lg font-bold">
              Frontend Developer
            </p>
            <p>patelshivam@example.com</p>
            <p>
              <button className="button rounded-lg bg-orange-400 text-white px-4 py-2 mt-2">
                Contact
              </button>
            </p>
          </div>
        </div>
        <div className="flex flex-col rounded-xl shadow-lg shadow-gray-400 mx-auto">
          <img src="./images/dev2.jpg" alt="Jane" className="w-100vw" />
          <div className="container p-8 text-center">
            <h2 className="text-black text-xl font-medium">Siddhesh Nikam</h2>
            <p className="title text-black text-lg font-bold">
              Backend Developer
            </p>
            <p>nikamsiddhesh@example.com</p>
            <p>
              <button className="button rounded-lg bg-orange-400 text-white px-4 py-2 mt-2">
                Contact
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
