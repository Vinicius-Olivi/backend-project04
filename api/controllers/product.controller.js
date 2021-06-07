const productService = require("../services/product.service");

const create = async (req, res, next) => {
  const { body, params } = req;
  const serviceResult = await productService.create({
    ...params,
    ...body,
  });

  const resultReturn = serviceResult.success ? 200 : 400;

  const returnData = serviceResult.success
    ? {
        data: serviceResult.data,
      }
    : { details: serviceResult.details };

  return res.status(resultReturn).send(returnData);
};

const list = async (req, res, next) => {
  const { query } = req;
  console.log("@@@@@", query);

  const result = await productService.searchByFilters(query);

  return res.status(200).send({
    data: result,
  });
};

module.exports = {
  create,
  list,
};
