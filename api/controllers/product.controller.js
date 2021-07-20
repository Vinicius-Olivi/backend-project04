const productService = require("../services/product.service");

const create = async (req, res, next) => {
  const { body, params, user } = req;
  const serviceResult = await productService.create({
    ...params,
    ...body,
    fornecedorlogadoid: user.id,
  });

  return res.status(200).send({
    message: "Operacao realizada com sucesso.",
    data: serviceResult.data,
  });
};

const list = async (req, res, next) => {
  const { query } = req;

  const result = await productService.searchByFilters(query);

  return res.status(200).send({
    data: result,
  });
};

const remove = async (req, res, next) => {
  const { supplierid, productid } = req.params;

  const serviceResult = await productService.exclude({
    supplierId: supplierid,
    productId: productid,
    userId: req.user.id,
  });

  const resultReturn = serviceResult.success ? 200 : 400;
  const returnData = serviceResult.success
    ? {
        message: serviceResult.mesage,
        data: serviceResult.data,
      }
    : { details: serviceResult.details };

  return res.status(resultReturn).send(returnData);
};

module.exports = {
  create,
  list,
  remove,
};
