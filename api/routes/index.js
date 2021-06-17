const { Router } = require("express");
const { name, version } = require("../../package.json");

const routesV1Users = require("./v1/user");
const routesV1Categories = require("./v1/category");
const routesV1Supplier = require("./v1/supplier");
const routesV1Client = require("./v1/client");
const routesV1Product = require("./v1/product");
const routesV1Upload = require("./v1/upload");

module.exports = (app) => {
  app.get("/", (req, res, next) => {
    res.send({ name, version });
  });

  const routesV1 = Router();

  routesV1Users(routesV1);
  routesV1Categories(routesV1);
  routesV1Supplier(routesV1);
  routesV1Client(routesV1);
  routesV1Product(routesV1);
  routesV1Upload(routesV1);

  app.use("/v1", routesV1);
};
