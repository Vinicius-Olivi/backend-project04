const nodeEnvironment = process.env.NODE_ENV || "development";

if (nodeEnvironment === "development") {
  require("dotenv").config();
}

module.exports = {
  uri: `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}`,
};
