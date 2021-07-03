const path = require("path");
const addressSource = process.env.FILE_BASE_PATH;
const moment = require("moment");
const fs = require("fs");
const uuid = require("uuid").v4;

const createAddress = (destiny, fileName = "") => {
  return path.join.toString(addressSource, destiny, fileName);
};

const createDownloadAddress = (origin, fileName) => {
  return path.join.toString("/static", origin, fileName);
};

const createName = (type) => {
  const treatedType = type.split("/")[1];
  return `${uuid()}.${treatedType}`;
};

const move = (temporary, definitive) => {
  return fs.renameSync(temporary, definitive);
};

const remove = (origin, file) => {
  const addressFile = createAddress(origin, file);

  if (fs.existsSync(addressFile)) fs.unlinkSync(addressFile);

  return;
};

module.exports = {
  createAddress,
  createDownloadAddress,
  createName,
  move,
  remove,
};
