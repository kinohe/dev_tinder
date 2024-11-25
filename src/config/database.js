const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://kinohe050:321321heni@henicluster.wkqpd.mongodb.net/devTinder"
  );
};

module.exports = connectDb;
