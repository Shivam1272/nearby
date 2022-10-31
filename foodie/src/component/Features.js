import React, { useState, useEffect } from "react";
import ReactCardFlip from "react-card-flip";

function Features({
  vendor,
  visible,
  profile,
  documents,
  help,
  about,
  onClose,
}) {
  let [vendors, setVendor] = useState();
  useEffect(() => {
    setVendor(vendor);
  }, [vendor]);

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
        <div className="pt-5 px-2 z-50">
          <Profile vendor={vendors} visible={profile} />
          <Documents visible={documents} vendor={vendors} />
          <Help visible={help} />
          <About visible={about} />
        </div>
      </div>
    </div>
  );
}

export default Features;

function Profile({ vendor, visible }) {
  let vendorDetail = vendor;
  const [fassi, setfassi] = useState();
  const [hawker, sethawker] = useState();
  const [address, setAddress] = useState();
  const [menu, setMenu] = useState();
  const [showForm, setshowForm] = useState(false);
  const [isFlipped, setisFlipped] = useState(true);
  const [enableTakeAway, setEnableTakeAway] = useState(false);

  useEffect(() => {}, [vendor, enableTakeAway]);

  const handleClick = () => {
    setisFlipped(!isFlipped);
  };

  let fileSelctedHandler = (e) => {
    setfassi(e.target.files[0]);
    sethawker(e.target.files[0]);
    setAddress(e.target.files[0]);
    setMenu(e.target.files[0]);
  };

  const fileUploadHandler = async () => {
    const formData = new FormData();
    formData.append("fssaiLicense", fassi);
    formData.append("hawkerLicense", hawker);
    formData.append("addressProof", address);
    formData.append("menuImage", menu);
    let res = await fetch("/vendor/upload/documents", {
      method: "POST",
      body: formData,
    });
    let data = await res.json();
    if (data.success === true) {
      window.alert(data.message);
    } else {
      window.alert(data.message);
    }
  };

  const setTakeAway = async () => {
    setEnableTakeAway(!enableTakeAway);
    let res = await fetch("/vendors/update/me", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        takeAwayOrderstatus: {
          byVendor: enableTakeAway,
        },
      }),
    });
  };

  if (!visible) return null;
  return (
    <>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
        <div className="w-fit">
          <div className="flex justify-center items-center bg-orange-400 rounded-2xl p-2 text-white font-bold">
            Personal Deatil
          </div>
          <div className="m-2 rounded-lg flex flex-col justify-evenly">
            {/* <div className="flex justify-between items-center">
              <h1 className=" font-mono font-bold text-lg">Edit</h1>
            </div> */}
            {/* <img src="./images/map.png" alt="" /> */}
            <div className="flex flex-col">
              <div className="flex justify-between items-center my-2">
                <label className="font-bold text-sm">
                  <i className="fa fa-user" />
                  <span className="p-2">Name</span>
                </label>
                <span>{vendorDetail.vendorName}</span>
              </div>
              <div className="flex justify-between items-center my-2">
                <label className="font-bold text-sm">
                  <i className="fa fa-phone" />
                  <span className="p-2">mobile</span>
                </label>
                <span>{vendorDetail.contactNo}</span>
              </div>
              <div className="flex justify-between items-center my-2">
                <label className="font-bold text-sm">
                  <i className="fa fa-location" />
                  <span className="p-2">City</span>
                </label>
                <label>{vendorDetail.address.city}</label>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center p-2 ">
            <button
              className="bg-lime-400 p-2 rounded-2xl font-bold text-white hover:bg-white hover:text-black"
              onClick={handleClick}
            >
              Shop Detail
            </button>
          </div>
        </div>
        <div className="w-fit">
          <div className="m-2 rounded-lg flex flex-col justify-evenly">
            <div className="flex justify-center items-center bg-orange-400 rounded-2xl p-2 text-white font-bold">
              SHOP Detail
            </div>
            <div className="flex flex-col">
              <div className="flex flex-wrap justify-between items-center my-2">
                <label className="font-bold text-sm">
                  <i className="fa fa-truck" />
                  <span className="p-2">Shop Name</span>
                </label>
                <label>{vendorDetail.shopName}</label>
              </div>
              <div className="flex justify-between items-center my-2">
                <label className="font-bold text-sm">
                  <i className="fa fa-location" />
                  <span className="p-2">City</span>
                </label>
                <label>{vendorDetail.address.city}</label>
              </div>
              <div className="flex justify-between items-center my-2">
                <label className="font-bold text-sm">
                  <i className="fa fa-id-card" />
                  <span className="p-2">Liscense No</span>
                </label>
                <label>-------------</label>
              </div>
              <div className="flex text-white font-bold">
                <div className="flex justify-center items-center my-2 mx-1 bg-lime-400 rounded-xl shadow-lg px-2 py-1">
                  <button
                    className="font-bold text-sm"
                    onClick={() => {
                      setshowForm(!showForm);
                    }}
                  >
                    Upload Documents & Menu Card
                  </button>
                </div>
              </div>
              {showForm && (
                <div className="w-full flex flex-col">
                  <div className="flex justify-center items-start flex-col">
                    <span className="px-5">fassi Liscense</span>
                    <input
                      className="px-5"
                      type="file"
                      onChange={fileSelctedHandler}
                    />
                  </div>
                  <div className="flex justify-center items-start flex-col">
                    <span className="px-5">Hawker Liscense</span>
                    <input
                      className="px-5"
                      type="file"
                      onChange={fileSelctedHandler}
                    />
                  </div>
                  <div className="flex justify-center items-start flex-col">
                    <span className="px-5">Address Proof</span>
                    <input
                      className="px-5"
                      type="file"
                      onChange={fileSelctedHandler}
                    />
                  </div>
                  <div className="flex justify-center flex-col">
                    <span className="px-5 m-1">Menu Card</span>
                    <input
                      className="px-5 m-1"
                      type="file"
                      onChange={fileSelctedHandler}
                    />
                  </div>
                  <div className="flex justify-center items-center  font-bold text-white">
                    <button
                      className="px-3 py-1 m-1 bg-orange-400 rounded-3xl shadow-sm "
                      onClick={fileUploadHandler}
                    >
                      upload
                    </button>
                  </div>
                </div>
              )}
              <div className="flex justify-center items-center my-2">
                <button
                  onClick={setTakeAway}
                  className={`font-bold text-sm p-2 rounded-2xl text-white ${
                    vendorDetail.takeAwayOrderstatus.admin
                      ? "bg-lime-400"
                      : "bg-red-400"
                  }`}
                >
                  Enable Take Away
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center p-2 ">
            <button
              className="bg-lime-400 p-2 rounded-2xl  font-bold text-white hover:bg-white hover:text-black"
              onClick={handleClick}
            >
              Personal Detail
            </button>
          </div>
        </div>
      </ReactCardFlip>
    </>
  );
}

function Documents({ vendor, visible }) {
  let vendorDetail = vendor;
  let [param, setParam] = useState("menuImage");
  let [imageUrl, setUrl] = useState();
  const load_pic = async () => {
    const url = `/vendors/documents/${vendorDetail._id}/get/${param}`;
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
  }, [param]);

  if (!visible) return null;
  return (
    <>
      <div className="flex justify-center items-center bg-orange-400 rounded-2xl py-1 px-2 text-white font-bold">
        Documents
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between items-center p-2">
          <button
            onClick={() => {
              setParam("menuImage");
              load_pic();
            }}
          >
            Menu Card
          </button>
          <button
            onClick={() => {
              setParam("fssaiLicense");
              load_pic();
            }}
          >
            Fssai License
          </button>
          <button
            onClick={() => {
              setParam("hawkerLicense");
              load_pic();
            }}
          >
            Hawker License
          </button>
          <button
            onClick={() => {
              setParam("addressProof");
              load_pic();
            }}
          >
            Address Proof
          </button>
        </div>
        <div className="p-2 rounded-lg shadow-lg">
          <img src={imageUrl} alt="image" className=" w-full h-[250px]" />
        </div>
      </div>
    </>
  );
}
function Help({ visible }) {
  if (!visible) return null;
  return (
    <div className="m-2 rounded-lg">
      Help
      <img src="./images/map.png" alt="" />
    </div>
  );
}
function About({ visible }) {
  if (!visible) return null;
  return (
    <div className="m-2 rounded-lg">
      About
      <img src="./images/map.png" alt="" />
    </div>
  );
}
