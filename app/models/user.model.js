const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        min: 6,
        max: 100   
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password: { 
        type: String,
        required: true,
        min: 6,
        max: 999
    },
    phone_number: {
        type: String,
        required: true,
        max: 10
    },
    join_date: {
        type: Date,
        default: Date.now
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],

  })
);

module.exports = User;