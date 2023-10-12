const mongoose = require("mongoose");

const { Schema } = mongoose;

const planetsSchema = new Schema({
  keplerName: {
    type: String,
    required: true,
  },
});
