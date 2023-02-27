const { Schema, model } = require("mongoose");

const portSchema = new Schema({
  port: {
    type: String,
    required: true,
    index: { unique: true },
  },
  deliveryPrice: {
    type: Number,
    required: true,
  },
});

module.exports = model("Port", portSchema);
