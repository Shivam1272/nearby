import React, { useState, useEffect } from "react";

function FoodItem({ item, menuItem, id }) {
  let orderId = id;
  console.log(orderId);
  let foodname = item.foodName;
  const [Price, setPrice] = useState(0);
  const [isAdded, setisAdded] = useState(false);
  const [foodItem, setfoodItem] = useState({
    foodname: foodname,
    quantity: 0,
    price: 0,
  });

  let d = menuItem.find((tempitem) => tempitem.foodName === foodItem.foodname);
  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setfoodItem({ ...foodItem, [name]: value });
    setPrice(d.price * value);
  };

  let SetPrice = () => {
    let temp = d.price * foodItem.quantity;
    setfoodItem({ ...foodItem, price: temp });
  };

  const addToOrder = async () => {
    let res = await fetch(`/users/order/${orderId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderDetails: foodItem,
      }),
    });
  };

  useEffect(() => {
    SetPrice();
  }, [foodItem.quantity]);

  return (
    <div className="w-full flex mt-2 px-2 justify-between items-center">
      <div className="border-none ">
        <input
          className="pl-2  outline-none"
          type="text"
          readOnly={true}
          name="name"
          value={item.foodName}
        />
        <input
          onChange={handleInput}
          className="pl-2"
          type="Number"
          name="quantity"
          value={foodItem.quantity}
          min={0}
          placeholder="Quantity"
        />
      </div>
      <div className="pr-2 flex justify-between">
        <label>₹ {Price}</label>
        <button
          className={`${
            isAdded ? "bg-lime-400" : "bg-orange-400"
          } px-2 py-1 rounded-xl`}
          onClick={() => {
            addToOrder();
            setisAdded(true);
          }}
        >
          {isAdded ? <i className="fa fa-check" /> : "+"}
        </button>
      </div>
    </div>
  );
}

export default FoodItem;
