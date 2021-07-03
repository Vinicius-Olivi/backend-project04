const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = {
  name: {
    type: String,
    required: true,
  },

  birthdate: {
    type: String,
    required: true,
  },

  uf: {
    type: String,
    required: true,
  },

  cidade: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    required: true,
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "like",
    },
  ],
};

module.exports = clientSchema;
