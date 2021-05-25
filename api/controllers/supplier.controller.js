const supplierService = require("../services/supplier.service");

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
  return res.status(codeReturn.send(dataReturn));
};

module.exports = { create };
