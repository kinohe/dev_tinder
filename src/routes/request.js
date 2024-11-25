const express = require("express");
const { userAuth } = require("../middleware/auth");

const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", userAuth, (req, res) => {
  const user = req.user;
  console.log("sending a connection");

  res.send(user.firstName + " Sent a connection");
});

module.exports = requestRouter;
