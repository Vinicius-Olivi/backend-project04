const { user } = require("../models/index");
const crypto = require("../utils/crypto.utils");
const userMapper = require("../mappers/user.mapper");

const profiles = [
  {
    id: "1",
    description: "admin",
    functionalities: [
      "UPDATE_CATEGORY",
      "CREATE_CATEGORY",
      "SEARCH_CATEGORY",
      "REMOVE_CATEGORY",
      "SEARCH_SUPPLIER",
      "SEARCH_SUPPLIER_ID",
      "ACTIVATE_SUPPLIER",
      "INACTIVATE_SUPPLIER",
      "SEARCH_SUPPLIER_PRODUTO",
    ],
  },
  {
    id: "2",
    description: "supplier",
    functionalities: [
      "UPDATE_SUPPLIER",
      "SEARCH_SUPPLIER_ID",
      "SEARCH_PRODUCT",
      "CREATE_PRODUCT",
      "REMOVE_PRODUTO",
      "SEARCH_SUPPLIER_PRODUTO",
    ],
  },
  {
    id: "3",
    description: "client",
    functionalities: [],
  },
];

const ifEmailExist = async (email) => {
  const users = await user.find({ email });

  return users.length > 0 ? true : false;
};

const userValid = async (email, password) => {
  return (await user.findOne({
    email,
    password: crypto.createHash(password),
  }))
    ? true
    : false;
};

const credencialCreate = async (userEmail) => {
  const userDB = await user.findOne({
    email: userEmail,
  });

  const userDTO = userMapper.toUserDTO(userDB);

  return {
    token: crypto.createToken(userDTO),
    userDTO,
  };
};

const authenticate = async (email, password) => {
  const resultDB = await userValid(email, password);
  if (!resultDB) {
    return {
      success: false,
      message: "it was not possible to authenticate the user",
      details: ["invalid username or password"],
    };
  }

  return {
    success: true,
    message: "user authenticated !",
    data: await credencialCreate(email),
  };
};

const create = async () => {
  return user.create({
    email: "admin@teste.com",
    password: md5(`123123${process.env.MD5_SECRET}`),
  });
};

const searchProfileById = (profileId) => {
  const result = profiles.find((item) => Number(item.id) === Number(profileId));
  return result;
};

const functionalitiesProfileValidate = (profileId, functionalities) => {
  const perfil = searchProfileById(profileId);
  return perfil.functionalities.includes(functionalities);
};

module.exports = {
  authenticate,
  create,
  ifEmailExist,
  functionalitiesProfileValidate,
};
