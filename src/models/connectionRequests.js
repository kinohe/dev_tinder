const mongoose = require("mongoose");

const connectionrequest = mongoose.Schema({
  fromUserId: {
    type: string,
  },
  toUserId,
});
