const { supplier } = require("../models/index");
const { ifEmailExist } = require("../services/user.service");
const { toListItemDTO } = require("../mappers/supplier.mapper");
const { createHash } = require("../utils/crypto.utils");
const emailUtils = require("../utils/email");

const ifCrnExist = async (crn) => {
  const result = await supplier.find({
    crn,
  });

  return result.length > 0 ? true : false;
};

const statusUpdate = async (id, status) => {
  const supplierDB = await supplier.findById(id);

  if (!supplierDB) {
    return {
      success: false,
      message: "operacao nao pode ser realizada",
      details: [
        "Nao existe fornecedor cadastrado para o fornecedor id informado",
      ],
    };
  }

  supplierDB.status = status;

  await supplierDB.save();

  if (status === "Active") {
    emailUtils.sendMessage({
      receiver: supplierDB.email,
      sender: process.env.SENDER,
      subject: `Confirmacao do cadastro de ${supplierDB.fantasyName}`,
      body: `acesso liberado`,
    });
  }
  return {
    success: true,
    message: " Operacao realizada com sucesso",
    data: {
      ...toListItemDTO(supplierDB.toJSON()),
    },
  };
};

const create = async (model) => {
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
      ...toListItemDTO(newSupplier),
    },
  };
};

const listAll = async (filter) => {
  const resultDB = await supplier.find();

  return resultDB.map((item) => {
    return toListItemDTO(item);
  });
};
module.exports = { create, statusUpdate, listAll };
