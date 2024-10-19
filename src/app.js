const express = require("express");

const app = express();

app.use("/test", (req, res) => {
  res.send("hello from test");
});

app.use((req, res) => {
  res.send("hello world");
});

app.listen(9000, () => {
  console.log("Server is listening on port: 9000 ");
});
