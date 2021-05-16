const categoryService = require("../services/category.service");

const create = async (req, res, next) => {
  const { body } = req;

  const serviceResult = await categoryService.categoryCreate(body);

  const resultReturn = serviceResult.success ? 200 : 401;
  const returnData = serviceResult.success
    ? { data: serviceResult.data }
    : { details: serviceResult.details };

  return res.status(200).send();
};

const list = async (req, res, next) => {
  const result = await categoryService.listAll();
  return res.status(200).send({
    data: result,
  });
};

const update = (req, res, next) => {
  return res.status(200).send([]);
};

const searchById = (req, res, next) => {
  return res.status(200).send([]);
};

const exclude = (req, res, next) => {
  return res.status(200).send([]);
};

module.exports = {
  create,
  list,
  update,
  searchById,
  exclude,
};
