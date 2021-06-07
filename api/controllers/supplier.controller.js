const supplierService = require("../services/supplier.service");

const activate = async (req, res, next) => {
  const { supplierid } = req.params;

  const serviceResult = await supplierService.statusUpdate(
    supplierid,
    "Active",
  );

  const resultReturn = serviceResult.success ? 200 : 400;

  const returnData = serviceResult.success
    ? {
        data: serviceResult.data,
      }
    : { details: serviceResult.details };
  return res.status(resultReturn).send({
    ...returnData,
  });
};

const inactivate = async (req, res, next) => {
  const { supplierid } = req.params;

  const serviceResult = await supplierService.statusUpdate(
    supplierid,
    "Inactive",
  );

  const resultReturn = serviceResult.success ? 200 : 400;
  const returnData = serviceResult.success
    ? {
        data: serviceResult.data,
      }
    : { details: serviceResult.details };
  return res.status(resultReturn).send({
    ...returnData,
  });
};

const create = async (req, res, next) => {
  const { body } = req;

  const result = await supplierService.create(body);

  //tratar saida

  const resultReturn = result.success ? 200 : 400;

  const returnData = result.success
    ? {
        data: result.data,
      }
    : { details: result.details };
  return res.status(resultReturn).send(returnData);
};

const list = async (req, res, next) => {
  const data = await supplierService.listAll();
  return res.status(200).send({
    data,
  });
};

const seacrhProductsBySupplier = async (req, res, next) => {
  const { params } = req;
  const data = await supplierService.listProductsBySupplier(params.supplierid);
  return res.status(200).send({
    data,
  });
};

module.exports = {
  create,
  list,
  activate,
  inactivate,
  seacrhProductsBySupplier,
};
