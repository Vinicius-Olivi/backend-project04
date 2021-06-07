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
    originName: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
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
