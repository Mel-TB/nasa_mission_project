const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const planetsSchema = new Schema({
  keplerName: {
    type: String,
    required: true,
  },
});


module.exports = model('Planet', planetsSchema)