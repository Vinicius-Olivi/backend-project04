const clientService = require("../services/client.service");

const create = async (req, res, next) => {
  const { body } = req;
  const result = await clientService.create(body);

  const resultReturn = result.success ? 200 : 400;
  const returnData = result.success
    ? {
        data: result.data,
      }
    : { details: result.details };

  return res.status(resultReturn).send(returnData);
};

const searchLikes = async (req, res, next) => {
  return res.status(200).send({
    data: [],
  });
};

const searchById = async (req, res, next) => {
  const { params, user } = req;
  const result = await clientService.searchById({
    user,
    clientid: params.clientid,
  });
  return res.status(200).send({ result });
};

const list = async (req, res, next) => {
  const result = await clientService.list();

  return res.status(200).send({
    data: result,
  });
};

module.exports = {
  create,
  searchById,
  searchLikes,
  list,
};
