const express = require("express");
require("./db/mongoose.js");
const userRouter = require("./routers/user");
const adminRouter = require("./routers/admin");
const vendorRouter = require("./routers/vendor");
const bodyParser = require("body-parser");
const cors = require("cors");
var cookieParser = require("cookie-parser");

const port = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(userRouter);
app.use(adminRouter);
app.use(vendorRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("foodie/build"));
}
app.listen(port, () => {
  console.log("Server is running on Port", process.env.PORT);
});
