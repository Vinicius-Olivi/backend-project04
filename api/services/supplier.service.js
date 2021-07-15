const { supplier } = require("../models/index");
const {
  ifEmailExist,
  searchUserTypeById,
} = require("../services/user.service");
const { toListItemDTO, toDTO } = require("../mappers/supplier.mapper");
const { createHash } = require("../utils/crypto.utils");
const emailUtils = require("../utils/email");
const productMapper = require("../mappers/product.mapper");

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
      details: ["Nao existe supplier cadastrado para o supplier id informado"],
    };
  }

  supplierDB.status = status;

  await supplierDB.save();

  if (status === "Active") {
    emailUtils.sendMessage({
      receiver: supplierDB.email,
      sender: process.env.SENDGRID_SENDER,
      subject: `Confirmacao do cadastro de ${supplierDB.fantasyName}`,
      body: `acesso ao project 4 liberado`,
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
  const { email, crn, password, ...residual } = model;

  if (await ifCrnExist(crn))
    return {
      success: false,
      message: "operacao nao pode ser realizada",
      details: ["ja existe supplier cadastrado"],
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
    ...residual,
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
  const resultDB = await supplier
    .find({})
    .sort({ fantasyName: 1 })
    .populate({
      path: "likes",
      model: "like",
      populate: {
        path: "client",
        model: "client",
      },
    });

  return resultDB.map((item) => {
    return toDTO(item.toJSON());
  });
};

const listProductsBySupplier = async (supplierid, fornecedorlogadoid) => {
  if (supplierid !== fornecedorlogadoid) {
    return {
      message: "User nao autorizado",
    };
  }
  const supplierFromDB = await supplier
    .findById(supplierid)
    .populate("products");

  console.log(JSON.stringify(supplierFromDB.products));

  const supplierAsJSON = supplierFromDB.toJSON();

  return supplierAsJSON.products.map((item) => {
    return productMapper.toItemListDTO(item);
  });
};

const searchById = async (supplierid, { id, type }) => {
  const supplierDB = await supplier.findById(supplierid);

  if (!supplierDB) {
    return {
      success: false,
      message: "operação não pode ser realizada",
      details: ["o supplier pesquisado não existe"],
    };
  }

  const userType = searchUserTypeById(type);

  if (userType.description === "supplier") {
    if (supplierid !== id) {
      return {
        success: false,
        message: "operação não pode ser realizada",
        details: ["o user nao pode realizar essa operacao"],
      };
    }
  }

  return {
    success: true,
    data: toDTO(supplierDB.toJSON()),
  };
};

module.exports = {
  create,
  statusUpdate,
  listAll,
  listProductsBySupplier,
  searchById,
};
