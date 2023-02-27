const { Schema, model } = require("mongoose");

const citySchema = new Schema({
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
    index: { unique: true },
  },
  activeport: {
    type: Schema.Types.ObjectId,
    ref: "Port",
    required: true,
  },
  deliveryprice: {
    type: Number,
    required: true,
  },
});

module.exports = model("City", citySchema);
