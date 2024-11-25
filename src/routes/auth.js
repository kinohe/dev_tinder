const express = require("express");
const { validateSignupData } = require("../util/validator");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { userAuth } = require("../middleware/auth");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    //validation of data
    validateSignupData(req);
    //Encryption of a password
    const { firstName, lastName, emailId, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("user registered successfully");
  } catch (error) {
    res.status(401).send("Error saving the user " + error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      //create JWT token
      // const token = await jwt.sign({ _id: user._id }, "DEV@Tinder740", {
      //   expiresIn: "7d",
      // });
      const token = await user.getJwt();

      //add the token to the cookie and send back the response
      res.cookie("token", token);
      res.send("login successful");
    } else {
      throw new Error("invalid credentials");
    }
  } catch (error) {
    res.status(400).send("Error" + error.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie();
});

module.exports = authRouter;
