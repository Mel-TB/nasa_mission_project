const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const launchesSchema = new Schema({
  flightNumber: {
    type: Number,
    required: true,
  },
  mission: {
    type: String,
    required: true,
  },
  rocket: {
    type: String,
    required: true,
  },
  target: {
    type: String,
    required: true,
  },
  launchDate: {
    type: Date,
    required: true,
  },
  customer: {
    type: [String],
  },
  upcoming: {
    type: Boolean,
    required: true,
  },
  success: {
    type: Boolean,
    required: true,
    default: true,
  },
});

// Connects LaunchesSchema with 'launches' collection
module.exports = model("Launch", launchesSchema);

module.exports = launches;
