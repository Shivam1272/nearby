const sendToken = async (userorvendor, str, statusCode, res) => {
  let token = "";
  if (str === "user") {
    token = await userorvendor.generateAuthToken();
  } else {
    token = await userorvendor.generateAuthToken();
  }

  // options for cookie
  const options = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    userorvendor,
    token,
  });
};

module.exports = sendToken;
