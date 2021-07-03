const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = {
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },

  image: {
    originalName: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
    },
  },

  category: {
    type: Schema.Types.ObjectId,
    ref: "category",
  },

  supplier: [
    {
      type: Schema.Types.ObjectId,
      ref: "supplier",
    },
  ],
};
