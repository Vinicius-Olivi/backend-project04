const { ifEmailExist } = require("./user.service");
const { client } = require("../models/index");
const { toListItemDTO } = require("../mappers/client.mapper");
const { createHash } = require("../utils/crypto.utils");

const create = async (model) => {
  const { email, password, ...residual } = model;

  //TODO: email ja existente
  if (await ifEmailExist(email))
    return {
      success: false,
      message: "operação não pode ser realizada",
      details: ["Já existe usuário cadastrado para o email informado"],
    };

  const newClient = await client.create({
    email,
    ...residual,
    password: createHash(password),
    status: "Active",
  });

  return {
    success: true,
    message: "Operação realizada com success",
    data: {
      ...toListItemDTO(newClient),
    },
  };
};

module.exports = {
  create,
};
