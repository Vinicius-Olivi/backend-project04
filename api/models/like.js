const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = {
  supplier: {
    type: Schema.Types.ObjectId,
    required: true.valueOf,
    ref: "supplier",
  },
  client: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: "client",
  },
};
