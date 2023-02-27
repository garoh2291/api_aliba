const { Schema, model } = require("mongoose");

const fobSchema = new Schema({
  minValue: {
    type: Number,
    required: true,
    index: { unique: true },
  },
  maxValue: {
    type: Number,
  },
  additionalFee1: {
    type: Number,
    required: true,
  },
  additionalFee2: {
    type: Number,
    required: true,
  },
  additionalFee3: {
    type: Number,
    required: true,
  },
  additionalFee4: {
    type: Number,
    required: true,
  },
});

module.exports = model("Fob", fobSchema);
