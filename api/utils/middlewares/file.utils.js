const path = require("path");
const addressSource = process.env.FILE_BASE_PATH;
const moment = require("moment");
const fs = require("fs");
const uuid = require("uuid").v4;

const createAddress = (destiny, fileName = "") => {
  return path.join(addressSource, destiny, fileName);
};

const createName = (type) => {
  const treatedType = type.split("/")[1];
  return `${uuid()}.${treatedType}`;
};

const move = (temporary, definitive) => {
  return fs.renameSync(temporary, definitive);
};

module.exports = {
  createAddress,
  createName,
  move,
};
