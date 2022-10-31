import React, { useState, useEffect } from "react";

function InOrderDetail({ order }) {
  return (
    <div className="right-div flex flex-col space-y-2 overflow-hidden">
      <div
        className="right-div grid grid-cols-3 gap-3  px-2 m-1 text-white font-bold"
        key={order.foodId}
      >
        <p>{order.foodname}</p>
        <p>{order.price}</p>
        <p>{order.quantity}</p>
      </div>
    </div>
  );
}

function Orders({ orderData, user }) {
  let [orderStatus, setOrderStatus] = useState();
  let updateOrderStatus = async () => {
    let res = await fetch(`/vendors/update/order/${orderData._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderStatus: orderStatus,
      }),
    });
    let data = await res.json();
  };
  useEffect(() => {
    updateOrderStatus();
  }, [orderStatus]);

  return (
    <div
      className={`flex overflow-hidden flex-col lg:flex-row ${
        orderData.orderStatus ? "bg-lime-400" : "bg-red-600"
      }`}
    >
      <div className="left-div flex flex-col space-y-2 p-1 m-1">
        <span className="p-1 font-bold">Customer Name: {user.userName}</span>
        <span className="p-1 font-bold">Customer Add: {user.userAdd}</span>
        <span className="p-1 font-bold">Contact No: {user.contactNo}</span>
        <div>
          <div
            className={`rounded-sm text-center ${
              orderData.orderStatus ? "bg-lime-400" : "bg-red-600"
            } `}
          >
            <span className="font-bold">Order Status: </span>
            <span className="font-bold text-white">
              {orderData.orderStatus ? "Confirmed" : "Not Confirmed"}
            </span>
          </div>
        </div>
        <div className="flex justify-around items-center w-full">
          <button
            disabled={orderData.orderStatus}
            className={` rounded-xl m-1 px-2 py-1 font-bold ${
              orderData.orderStatus ? "bg-gray-400" : "bg-lime-400"
            }`}
            onClick={() => {
              setOrderStatus(true);
            }}
          >
            Accept
          </button>

          <button
            disabled={orderData.orderStatus}
            className={` rounded-xl m-1 px-2 py-1 font-bold ${
              orderData.orderStatus ? "bg-red-600" : "bg-gray-400"
            }`}
            onClick={() => {
              setOrderStatus(false);
            }}
          >
            Reject
          </button>
        </div>
      </div>
      <div
        className={`right-div flex flex-col space-y-2 ${
          orderData.orderStatus ? "bg-lime-400" : "bg-red-600"
        }`}
      >
        <div className="grid grid-cols-3 gap-3 text-center font-bold p-1 mx-1">
          <p>FoodName</p>
          <p>Price</p>
          <p>Quantity</p>
        </div>
        <div className="space-y-1 text-center">
          {orderData.orderDetails.map((order) => {
            return (
              <div key={order._id} className="">
                <InOrderDetail order={order} />
              </div>
            );
          })}
        </div>
        <div className=" font-bold m-1 p-1">
          <span className="font-bold">Total Price:</span>
          <span className="font-bold text-white pl-2">
            ₹ {orderData.totalPrice}
          </span>
        </div>
        <div
          className={`font-bold p-1 my-2 text-center text-white rounded-md ${
            orderData.orderStatus ? "bg-blue-400" : "bg-red-600 "
          }`}
        >
          {orderData.orderStatus
            ? `You accepted this order ${user.userName} will arrived in 30 min`
            : "**Once gets confirmed by vendor, order cannot be cancelled!!**"}
        </div>
      </div>
    </div>
  );
}

function SingleOrderDiv({ singleOrder }) {
  let [user, setUser] = useState();
  let userData = async () => {
    let res = await fetch(`/users/${singleOrder.userName}`, {
      method: "GET",
    });
    let data = await res.json();
    setUser(data);
  };
  userData();
  return (
    <div className="p-3 rounded-xl overflow-hidden">
      {user && <Orders orderData={singleOrder} user={user} />}
    </div>
  );
}

function MyOrders() {
  let [allOrders, setAllOrders] = useState([]);

  let orderData = async () => {
    let res = await fetch("/vendors/orders/me", {
      method: "GET",
    });
    let data = await res.json();
    setAllOrders(data);
  };

  useEffect(() => {
    orderData();
  }, [orderData]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="p-5 bg-orange-400 w-full items-center justify-center font-bold text-center m-1">
        My Orders
      </div>
      {allOrders && (
        <div className=" rounded-xl shadow-xl m-1">
          {allOrders.map((order) => {
            return (
              <div key={order._id}>
                <SingleOrderDiv
                  className="m-1 overflow-y-auto"
                  singleOrder={order}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MyOrders;
