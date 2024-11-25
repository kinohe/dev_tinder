const bcrypt = require("bcrypt");
const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const connectDb = require("./config/database");

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

// `app.post("/signup", async (req, res) => {`
//   try {
//     //validation of data
//     validateSignupData(req);
//     //Encryption of a password
//     const { firstName, lastName, emailId, password } = req.body;

//     const passwordHash = await bcrypt.hash(password, 10);
//     console.log(passwordHash);
//     const user = new User({
//       firstName,
//       lastName,
//       emailId,
//       password: passwordHash,
//     });
//     await user.save();
//     res.send("user registered successfully");
//   } catch (error) {
//     res.status(401).send("Error saving the user " + error.message);
//   }
// });

// app.post("/login", async (req, res) => {
//   try {
//     const { emailId, password } = req.body;
//     const user = await User.findOne({ emailId: emailId });

//     if (!user) {
//       throw new Error("Invalid credentials");
//     }

//     const isPasswordValid = await user.validatePassword(password);

//     if (isPasswordValid) {
//       //create JWT token
//       // const token = await jwt.sign({ _id: user._id }, "DEV@Tinder740", {
//       //   expiresIn: "7d",
//       // });
//       const token = await user.getJwt();

//       //add the token to the cookie and send back the response
//       res.cookie("token", token);
//       res.send("login successful");
//     } else {
//       throw new Error("invalid credentials");
//     }
//   } catch (error) {
//     res.status(400).send("Error" + error.message);
//   }
// });
// app.get("/profile", userAuth, async (req, res) => {
//   try {
//     const user = req.user;
//     res.send(user);
//   } catch (error) {
//     res.status(400).send("Error" + error.message);
//   }
// });

// app.post("/sendConnectionRequest", userAuth, (req, res) => {
//   const user = req.user;
//   console.log("sending a connection");

//   res.send(user.firstName + " Sent a connection");
// });

// app.get("/user", async (req, res) => {
//   const userEmail = req.body.emailId;

//   try {
//     const users = await User.find({ emailId: userEmail });
//     if (users.length === 0) {
//       res.status(404).send("User not found ");
//     } else {
//       res.send(users);
//     }
//   } catch (error) {
//     res.status(400).send("Something went wrong");
//   }
// });

// app.get("/feed", async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.send(users);
//   } catch (error) {
//     res.status(400).send("User not found");
//   }
// });

// app.delete("/user", async (req, res) => {
//   const userId = req.body.userId;

//   try {
//     const user = await User.findByIdAndDelete(userId);
//     res.send("user deleted successfully");
//   } catch (error) {
//     res.status(400).send("user not found");
//   }
// });

// app.patch("/user", async (req, res) => {
//   const userId = req.body.userId;
//   const data = req.body;

//   try {
//     const ALLOWED_UPDATES = ["photoUrl", "gender", "skills", "age", "about"];
//     const isAllowedUpdates = object.keys(data).every((k) => {
//       ALLOWED_UPDATES.includes(k);
//     });
//     if (!isAllowedUpdates) {
//       throw new Error("updates not allowed");
//     }
//     if (data?.skills.length > 10) {
//       throw new Error("Skills can not be more than 10");
//     }
//     const user = await User.findByIdAndUpdate({ _id: userId }, data, {
//       returnDocument: true,
//       runValidator: true,
//     });

//     res.send("user profile updated");
//   } catch (error) {
//     res.status(400).send("something went wrong");
//   }
// });
connectDb()
  .then(() => {
    console.log("Connection to DB established...");
    app.listen(9000, () => {
      console.log("Server is listening on port: 9000 ");
    });
  })
  .catch((err) => console.error("Connection to Db is not possible"));
