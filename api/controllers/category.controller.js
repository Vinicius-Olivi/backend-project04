const categoryService = require("../services/category.service");

const create = async (req, res, next) => {
  const { body } = req;

  const serviceResult = await categoryService.categoryCreate(body);

  const resultReturn = serviceResult.success ? 200 : 401;
  const returnData = serviceResult.success
    ? { data: serviceResult.data }
    : { details: serviceResult.details };

  return res.status(resultReturn).send(returnData);
};

const list = async (req, res, next) => {
  const result = await categoryService.listAll();
  return res.status(200).send({
    data: result,
  });
};

const update = async (req, res, next) => {
  const { params, body } = req;

  const serviceResult = await categoryService.categoryUpdate(
    params.categoryid,
    body,
  );

  const resultReturn = serviceResult.success ? 200 : 400;
  const returnData = serviceResult.success
    ? { data: serviceResult.data }
    : { details: serviceResult.details };

  return res.status(resultReturn).send(returnData);
};

const searchById = async (req, res, next) => {
  const { params } = req;
  //TODO: acionar busvar por id no  servico
  const category = await categoryService.searchById(params.categoryid);

  if (!category)
    return res.status(404).send({
      details: ["category informada nao existe"],
    });

  return res.status(200).send(category);
};

const exclude = async (req, res, next) => {
  const { params } = req;
  const serviceResult = await categoryService.exclude(params.categoryid);

  const resultReturn = serviceResult.success ? 200 : 400;

  const returnData = serviceResult.success
    ? {
        message: serviceResult.message,
      }
    : { details: serviceResult.details };

  return res.status(resultReturn).send(returnData);
};

module.exports = {
  create,
  list,
  update,
  searchById,
  exclude,
};
