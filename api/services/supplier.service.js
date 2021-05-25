const { supplier } = require("../models/index");
const { ifEmailExist } = require("../services/user.service");
const { createHash } = require("../utils/crypto.utils");

const ifCrnExist = async (crn) => {
  const result = await supplier.find({
    crn,
  });

  return result.length > 0 ? true : false;
};

const create = async (model) => {
  console.log("supplier.service");

  const { email, crn, password, ...rest } = model;

  if (await ifCrnExist(crn))
    return {
      success: false,
      message: "operacao nao pode ser realizada",
      details: ["ja existe fornecedor cadastrado"],
    };

  if (await ifEmailExist(email))
    return {
      success: false,
      message: "operacao nao pode ser realizada",
      details: ["email ja cadastrado"],
    };

  const newSupplier = await supplier.create({
    email,
    crn,
    ...rest,
    password: createHash(password),
    status: "Analise",
  });

  return {
    success: true,
    message: "operacao realizada com sucesso",
    data: {
      ...newSupplier,
    },
  };
};
module.exports = { create };
