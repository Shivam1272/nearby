const express = require("express");
const Vendor = require("../models/vendors");
const Order = require("../models/orders");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = new express.Router();
const sendToken = require("../../util/sendToken.js");

// Login -> Vendors
router.post("/vendors/login", async (req, res) => {
  try {
    const vendor = await Vendor.findByCredentials(
      req.body.vendorName,
      req.body.password
    );
    sendToken(vendor, "vendor", 200, res);
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
});

router.post("/vendors/signin", async (req, res) => {
  try {
    const vendor = await Vendor.create(req.body);
    sendToken(vendor, "vendor", 200, res);
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
});

// Logout -> Vendor
router.post("/vendors/logout", isAuthenticatedUser, async (req, res, next) => {
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
router.post(
  "/vendors/logoutall",
  isAuthenticatedUser,
  async (req, res, next) => {
    try {
      req.vendor.tokens = [];
      await req.vendor.save();

      res.send("Successfully Logged out from all connected devices..");
    } catch (e) {
      res.status(500).send();
    }
  }
);

// View Profile
router.get("/vendors/me", isAuthenticatedUser, async (req, res, next) => {
  const vendor = await Vendor.findById(req.vendor._id);
  res.status(200).send(vendor);
});

// View Profile by id
router.get("/vendors/:id", async (req, res, next) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      res.status(400).send();
    }
    res.status(200).json({
      vendorName: vendor.vendorName,
      shopName: vendor.shopName,
      shopAdd: vendor.address,
    });
  } catch (e) {
    res.status(500).send(e);
  }
});

// Update Profile -> Admin
router.patch("/vendors/update/me", isAuthenticatedUser, async (req, res) => {
  const updates = Object.keys(req.body);
  const validUpdates = [
    "password",
    "status",
    "shopLocation",
    "shopLocation.city",
    "shopLocation.location",
    "openOrClosedstatus",
    "takeAwayOrderstatus",
    "takeAwayOrderstatus.byVendor",
    "address",
    "address.city",
    "address.fulladdress",
    "addressCoords",
    "addressCoords.lat",
    "addressCoords.long",
  ];
  const isValidUpdate = updates.every((update) =>
    validUpdates.includes(update)
  );
  if (!isValidUpdate) {
    return res.status(400).send("Invalid Update !");
  }
  try {
    updates.forEach((update) => {
      if (update === "takeAwayOrderstatus") {
        req.vendor.takeAwayOrderstatus.byVendor =
          req.body.takeAwayOrderstatus.byVendor;
      } else {
        req.vendor[update] = req.body[update];
      }
    });
    await req.vendor.save();
    res.send(req.vendor);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Order details
router.get("/vendors/orders/me", isAuthenticatedUser, async (req, res) => {
  try {
    // const orders = await Order.find({ vendorName: req.vendor._id });
    await req.vendor.populate("orders").execPopulate();
    res.send(req.vendor.orders);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Update order
router.patch(
  "/vendors/update/order/:id",
  isAuthenticatedUser,
  async (req, res) => {
    const updates = Object.keys(req.body);
    const validUpdates = ["orderStatus"];
    const isValidUpdate = updates.every((update) =>
      validUpdates.includes(update)
    );
    if (!isValidUpdate) {
      return res.status(400).send("Invalid Update !");
    }
    try {
      const order = await Order.findOne({
        _id: req.params.id,
        vendorName: req.vendor._id,
      });
      if (!order) {
        return res.status(404).send();
      }

      updates.forEach((update) => (order[update] = req.body[update]));
      await order.save();
      res.send(order.orderStatus);
    } catch (e) {
      res.status(500).send(e);
    }
  }
);

module.exports = router;
