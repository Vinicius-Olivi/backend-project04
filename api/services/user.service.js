const { user } = require("../models/user");
const md5 = require("md5");
const jwt = require("jsonwebtoken");

const hashCreate = (password) => {
  return md5(password + hashSecret);
};

const userValid = async (email, password) => {
  return (await user.findOne({
    email,
    password: md5(`${password}${process.env.MD5_SECRET}`),
  }))
    ? true
    : false;
};

const credencialCreate = async (userEmail) => {
  const userDB = await user.findOne({
    email: userEmail,
  });

  const { id, email } = userDB;

  const credential = {
    token: jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: `${process.env.JWT_VALID_TIME}ms`,
    }),

    user: {
      id,
      email,
    },
  };
  return credential;
};

const authenticate = async (email, password) => {
  user.findOne;

  const resultFromDB = await userValid(email, password);

  if (resultFromDB) {
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
    email: "teste@teste.com",
    password: md5(`123123${process.env.MD5_SECRET}`),
  });
};

module.exports = {
  authenticate,
  create,
};
