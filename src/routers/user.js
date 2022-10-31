const express = require("express");
const Order = require("../models/orders");
const User = require("../models/users");
const { authUser } = require("../middleware/auth");
const router = new express.Router();
const sendToken = require("../../util/sendToken.js");

// SignUp
router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    sendToken(user, "user", 200, res);
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
});

// Login
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.contactNo,
      req.body.password
    );
    sendToken(user, "user", 200, res);
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
});

// Logout user
router.post("/users/logout", async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).json({
      success: true,
      message: "Logged out successfully.",
    });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});
// Logout all
router.post("/users/logoutall", authUser, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send("Successfully Logged out from all connected devices..");
  } catch (e) {
    res.status(500).send();
  }
});

// View Profile
router.get("/users/me", authUser, async (req, res) => {
  res.send(req.user);
});

// Update Profile
router.patch("/users/me", authUser, async (req, res) => {
  const updates = Object.keys(req.body);
  const validUpdates = ["name", "password"];
  const isValidUpdate = updates.every((update) =>
    validUpdates.includes(update)
  );
  if (!isValidUpdate) {
    return res.status(400).send("Invalid Update !");
  }
  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
});

// delete user
router.delete("/users/me", authUser, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

// to post a takeaway order
router.post("/users/order", authUser, async (req, res) => {
  const order = new Order({
    ...req.body,
    userName: req.user._id,
  });
  try {
    const orders = await order.save();
    res.status(201).send(orders);
  } catch (e) {
    res.status(400).send(e);
  }
});

// to update a takeaway order
router.patch("/users/order/:orderId", authUser, async (req, res) => {
  const _userId = req.user._id;
  const _orderId = req.params.orderId;

  const updates = Object.keys(req.body);
  const validUpdates = ["orderDetails", "totalPrice"];
  const isValidUpdate = updates.every((update) =>
    validUpdates.includes(update)
  );
  if (!isValidUpdate) {
    return res.status(400).send("Invalid Update !");
  }
  try {
    const order = await Order.findOne({ _id: _orderId, userName: _userId });
    updates.forEach((update) => {
      if (update === "orderDetails") {
        order[update] = order[update].concat(req.body[update]);
      } else {
        order[update] = req.body[update];
      }
    });
    await order.save();
    res.send(order);
  } catch (e) {
    res.status(500).send(e);
  }
});

//get order by id
router.get("/users/orders/:id", authUser, async (req, res) => {
  const orderId = req.params.id;
  try {
    const order = await Order.findOne({
      userName: req.user._id,
      _id: orderId,
    });
    if (!order) {
      res.status(404).send();
    }
    res.status(200).send(order);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Order details
router.get("/users/ordersdetails/me", authUser, async (req, res) => {
  try {
    const orders = await Order.find({ userName: req.user._id });
    res.send(orders);
  } catch (e) {
    res.status(500).send(e);
  }
});

// View Profile by id
router.get("/users/:id", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(400).send();
    }
    res.status(200).json({
      userName: user.name,
      contactNo: user.contactNo,
      userAdd: user.city,
    });
  } catch (e) {
    res.status(500).send(e);
  }
});
module.exports = router;
