import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import FoodItem from "./FoodItem";

function TakeAway() {
  let location = useLocation();
  let navigate = useNavigate();
  let vendor = location.state.vendor;
  let menuItem = location.state.menuItem;

  let [data, setData] = useState();
  let [detail, setShowDetail] = useState(false);
  let [btn, setShowbtn] = useState(true);
  let [mOrder, setShowmOrder] = useState(false);
  let [order, setOrder] = useState();
  let [isDone, setIsDone] = useState(false);
  let [isPlaceOrder, setisPlaceOrder] = useState(false);
  let [totalPrice, setTotalPrice] = useState(0);

  let fetchData = async () => {
    let res = await fetch("/users/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        vendorName: vendor._id,
      }),
    });
    let data1 = await res.json();
    setData(data1._id);
  };

  let fetchOrder = async () => {
    setShowDetail(true);
    let res = await fetch(`/users/orders/${data}`, {
      method: "GET",
    });
    let data2 = await res.json();
    setOrder(data2);
  };

  let tp = 0;
  {
    order &&
      detail &&
      order.orderDetails.map((item) => {
        tp = tp + item.price;
      });
  }

  // update total price of a order
  let updateOrder = async () => {
    let res = await fetch(`/users/order/${data}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        totalPrice: totalPrice,
      }),
    });
  };

  useEffect(() => {
    setTotalPrice(tp);
  }, [tp, totalPrice]);

  return (
    <div>
      <div className="bg-orange-400 p-5 font-serif justify-between items-center flex font-extrabold">
        <div>
          <button>
            <i className="fa fa-arrow-left" />
          </button>
        </div>
        <div>TakeAway Order</div>
        <div></div>
      </div>
      {/* TakeAway */}
      <div className="p-2 flex justify-evenly items-center rounded-lg shadow-lg flex-col-reverse xl:flex-row">
        {btn && (
          <button
            onClick={() => {
              setShowmOrder(true);
              fetchData();
              setShowbtn(false);
            }}
          >
            Make a Order
          </button>
        )}
        {mOrder && (
          <div className="flex flex-col font-bold">
            Menu Item
            {mOrder &&
              menuItem.map((item) => {
                return (
                  <div key={item.foodName}>
                    <FoodItem item={item} menuItem={menuItem} id={data} />
                  </div>
                );
              })}
          </div>
        )}
        <div className="flex">
          <img src={location.state.imageUrl} alt="Menu card is not there" />
        </div>
      </div>
      <div className="p-2 flex justify-around items-center flex-col xl:flex-row">
        <div className="flex flex-row lg:flex-col">
          {!isDone && (
            <button
              className={`text-lg font-bold m-1 p-2 rounded-lg shadow-lg ${
                isDone ? "bg-lime-400" : "bg-orange-400"
              } `}
              onClick={() => {
                setIsDone(true);
                fetchOrder();
              }}
            >
              Done
            </button>
          )}
          {detail && order && (
            <div>
              <button
                className="text-lg font-bold m-1 rounded-lg shadow-lg p-2 bg-red-400"
                disabled={order.orderStatus}
              >
                Cancle Order
              </button>
              <button
                className="text-lg font-bold m-1 rounded-lg shadow-lg p-2 bg-lime-400"
                disabled={order.orderStatus}
                onClick={() => {
                  updateOrder();
                  setisPlaceOrder(true);
                  navigate("/user/myorder");
                }}
              >
                {isPlaceOrder ? <i className="fa fa-check" /> : "Place Order"}
              </button>
            </div>
          )}
        </div>
        {detail && order && (
          <div className="left-div text-center">
            <div className="grid grid-cols-3 gap-3 bg-orange-400 font-bold p-1">
              <p>FoodName</p>
              <p>Price</p>
              <p>Quantity</p>
            </div>
            {order.orderDetails.map((item) => {
              return (
                <div
                  className="grid grid-cols-3 gap-3 bg-lime-400"
                  key={item._id}
                >
                  <p className="mx-auto">{item.foodname}</p>
                  <p className="mx-auto">{item.price}</p>
                  <p className="mx-auto">{item.quantity}</p>
                </div>
              );
            })}
            <div className="flex justify-around p-1 font-bold">
              <label>Total Price:</label>
              <label>₹ {totalPrice}</label>
            </div>
            <div className="bg-red-600 text-center font-bold p-1">
              **Once gets confirmed by vendor, order cannot be cancelled!!**
            </div>
          </div>
        )}
        {/* Shop Detail */}
        <div className="right-div bg-slate-600 m-2 rounded-lg shadow-lg text-white">
          <div className="flex justify-between items-center my-2 p-2">
            <span className="font-bold text-sm">Shop Name</span>
            <span className="">{vendor.shopName}</span>
          </div>
          <div className="flex justify-between items-center my-2 p-2">
            <span className="font-bold text-sm">Pick up from: </span>
            <span className="">{vendor.address.fulladdress}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TakeAway;
