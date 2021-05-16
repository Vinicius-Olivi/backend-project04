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

// CATEGORY

const categorySchema = require("./category");
const category = mongoose.model(
  "category",
  createSchema(undefined, categorySchema, {
    collection: " CategoryCollection",
  }),
);

module.exports = { user, admin, category };
