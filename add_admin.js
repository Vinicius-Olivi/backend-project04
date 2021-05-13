const nodeEnvironment = process.env.NODE_ENV || "development";

if (nodeEnvironment === "development") {
  require("dotenv").config();
}

const db = require("./db/config");

const mongoose = require("mongoose");
mongoose.connect(db.uri, { useUnifiedTopology: true, useNewUrlParser: true });

const { admin } = require("./api/models/index");
const crypto = require("./api/utils/crypto.utils");

const createAdmin = async () => {
  await admin.create({
    email: "admin@teste.com",
    name: "admin",
    password: crypto.createHash("123123"),
  });
};

createAdmin();
