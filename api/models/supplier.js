const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const supplierSchema = {
  crn: {
    type: String,
    required: true,
  },
  // name: {
  //   type: String,
  //   required: true,
  // },
  fantasyName: {
    type: String,
    required: true,
  },
  address: {
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
  responsable: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "product",
    },
  ],

  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "like",
    },
  ],
};

module.exports = supplierSchema;
