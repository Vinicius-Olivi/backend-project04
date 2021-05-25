const { Router } = require("express");

const { name, version } = require("../../package.json");

const routesV1Users = require("./v1/user");
const routesV1Categories = require("./v1/category");
const routesV1Supplier = require("./v1/supplier");

module.exports = (app) => {
  app.get("/", (req, res, next) => {
    res.send({ name, version });
  });

  const routesV1 = Router();

  routesV1Users(routesV1);
  routesV1Categories(routesV1);
  routesV1Supplier(routesV1);

  app.use("/v1", routesV1);
};
