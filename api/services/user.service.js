const { user } = require("../models/index");
const crypto = require("../utils/crypto.utils");
const userMapper = require("../mappers/user.mapper");

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
//   const { id, email } = userDB;

//   const credential = {
//     token: jwt.sign({ email }, process.env.JWT_SECRET, {
//       expiresIn: `${process.env.JWT_VALID_TIME}ms`,
//     }),

//     user: {
//       id,
//       email,

//       userType: 1,
//     },
//   };
//   return credential;

const authenticate = async (email, password) => {
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
    email: "admin@teste.com",
    password: md5(`123123${process.env.MD5_SECRET}`),
  });
};

module.exports = {
  authenticate,
  create,
};
