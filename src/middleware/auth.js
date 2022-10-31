const jwt = require("jsonwebtoken");
const User = require("../models/users");
const Vendor = require("../models/vendors");

const authUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return next(new Error("Please Login to access this resource"));
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    const userData = await User.findById(decodedData._id);
    req.user = userData;
    console.log(req.user, req.user._id);
    next();
  } catch (e) {
    res.status(401).send("Please Authenticate!");
  }
};

const isAuthenticatedUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return next(new Error("Please Login to access this resource"));
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    const data = await Vendor.findById(decodedData._id);
    req.vendor = data;
    next();
  } catch (error) {}
};

module.exports = { authUser, isAuthenticatedUser };
