const md5 = require("md5");
const jwt = require("jsonwebtoken");
const md5HashSecret = process.env.MD5_SECRET;
const jwtHashSecret = process.env.JWT_SECRET;
const jwtTimeLimit = process.env.JWT_VALID_TIME;

const createHash = (password) => {
  return md5(password + md5HashSecret);
};

const createToken = (model) => {
  return jwt.sign({ ...model }, jwtHashSecret, {
    expiresIn: `${jwtTimeLimit}ms`,
  });
};

const tokenValid = (token) => {
  try {
    return jwt.verify(token, jwtHashSecret);
  } catch (error) {
    return undefined;
  }
};

const decodesToken = (token) => {
  return jwt.decode(token);
};

module.exports = {
  createHash,
  createToken,
  tokenValid,
  decodesToken,
};
