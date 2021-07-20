const supplierService = require("../services/supplier.service");
const likeService = require("../services/like.service");

const activate = async (req, res, next) => {
  const { supplierid } = req.params;

  const serviceResult = await supplierService.statusUpdate(
    supplierid,
    "Active",
  );

  return res.status(200).send({
    message: "operaçao realizada com sucesso",
    data: serviceResult.data,
  });
};

const inactivate = async (req, res, next) => {
  const { supplierid } = req.params;

  const serviceResult = await supplierService.statusUpdate(
    supplierid,
    "Inactive",
  );

  return res.status(200).send({
    message: "operacao realizada com sucesso",
    data: serviceResult.data,
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

const searchProductsBySupplier = async (req, res, next) => {
  const { params, user } = req;
  const data = await supplierService.listProductsBySupplier(
    params.supplierid,
    user.id,
  );
  return res.status(200).send({
    data,
  });
};

const searchById = async (req, res, next) => {
  const { supplierid } = req.params;
  const { id, userType } = req.user;

  const result = await supplierService.searchById(supplierid, {
    id,
    type: userType,
  });

  const resultReturn = result.success ? 200 : 400;
  const returnData = result.success
    ? { data: result.data }
    : { details: result.details };

  return res.status(resultReturn).send(returnData);
};

const searchLikesReceived = async (req, res, next) => {
  return res.status(200).send({
    data: [],
  });
};

const likesReceived = async (req, res, next) => {
  return res.status(200).send({
    data: [],
  });
};

const receiveLikes = async (req, res, next) => {
  const { params, user } = req;

  const result = await likeService.create(params.supplierid, user.id);

  const resultReturn = result.success ? 200 : 400;
  const returnData = result.success
    ? { data: result.data }
    : { details: result.details };

  return res.status(resultReturn).send(returnData);
};

const likesDelete = async (req, res, next) => {
  const { user, params } = req;
  const result = await likeService.remove(params.supplierid, user.id);
  const resultReturn = result.success ? 200 : 400;
  const returnData = result.success
    ? { data: result.data }
    : { details: result.details };
  return res.status(resultReturn).send(returnData);
};

module.exports = {
  create,
  list,
  activate,
  inactivate,
  searchProductsBySupplier,
  searchById,
  searchLikesReceived,
  likesReceived,
  receiveLikes,
  likesDelete,
};
