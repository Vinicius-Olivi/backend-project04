const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const createSchema = (model, modelChild, options = {}) => {
  return new Schema(
    {
      ...model,
      ...modelChild,
    },
    {
      timestamps: true,
      collection: "UsersCollection",
      ...options,
    },
  );
};

// USERS
const userSchema = require("./user");
const user = mongoose.model(
  "user",
  createSchema(undefined, userSchema, {
    discriminatorKey: "kind",
  }),
);

const adminSchema = require("./admin");
const admin = user.discriminator(
  "admin",
  createSchema(userSchema, adminSchema, {}),
);

// SUPPLIER

const supplierSchema = require("./supplier");
const supplier = user.discriminator(
  "supplier",
  createSchema(userSchema, supplierSchema, {}),
);

// CATEGORY

const categorySchema = require("./category");
const category = mongoose.model(
  "category",
  createSchema(undefined, categorySchema, {
    collection: " CategoryCollection",
    toJSON: {
      virtuals: true,
    },
  }),
);

// PRODUCT

const productSchema = require("./product");
const product = mongoose.model(
  "product",
  createSchema(undefined, productSchema, {
    collection: "ProductColletion",
    toJSON: {
      virtuals: true,
    },
  }),
);

//## CLIENT
const clientSchema = require("./client.js");
const client = user.discriminator(
  "client",
  createSchema(userSchema, clientSchema, {}),
);

//LIKES
const likeSchema = require("./like");
const like = mongoose.model(
  "like",
  createSchema(undefined, likeSchema, {
    collection: "likeColletion",
    toJSON: {
      virtuals: true,
    },
  }),
);

module.exports = { user, admin, supplier, category, product, client, like };
