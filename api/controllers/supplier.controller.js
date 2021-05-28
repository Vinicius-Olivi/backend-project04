const supplierService = require("../services/supplier.service");

const activate = async (req, res, next) => {
  const { supplierid } = req.params;

  const serviceResult = await supplierService.statusUpdate(
    supplierid,
    "Active",
  );

  const codeReturn = serviceResult.success ? 200 : 400;

  const dataReturn = serviceResult.success
    ? {
        data: serviceResult.data,
      }
    : { details: serviceResult.details };
  return res.status(codeReturn).send({
    ...dataReturn,
  });
};
const inactivate = async (req, res, next) => {
  const { supplierid } = req.params;

  const serviceResult = await supplierService.statusUpdate(
    supplierid,
    "Inactive",
  );

  const codeReturn = serviceResult.success ? 200 : 400;

  const dataReturn = serviceResult.success
    ? {
        data: serviceResult.data,
      }
    : { details: serviceResult.details };
  return res.status(codeReturn).send({
    ...dataReturn,
  });
};

const create = async (req, res, next) => {
  const { body } = req;

  const result = await supplierService.create(body);

  //tratar saida

  const codeReturn = result.success ? 200 : 400;

  const dataReturn = result.success
    ? {
        data: result.data,
      }
    : { details: result.details };
  return res.status(codeReturn).send(dataReturn);
};

const list = async (req, res, next) => {
  const data = await supplierService.listAll();
  return res.status(200).send({
    data,
  });
};

module.exports = { create, list, activate, inactivate };
