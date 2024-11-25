const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    //read the token from req.cookies
    const { token } = req.cookies;
    if (!token) {
      throw new Error("invalid token!");
    }

    //validate the token
    const decodedObj = await jwt.verify(token, "DEV@Tinder740");

    const { _id } = decodedObj;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("user not found");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
};

module.exports = {
  userAuth,
};
