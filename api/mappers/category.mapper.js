const fileUtils = require("../utils/file.utils");

const toItemListDTO = (model) => {
  const { _id, name, status, image } = model;

  return {
    id: _id,
    name,
    status,
    image: fileUtils.createDownloadAddress("categories", image.name),
  };
};

const toDTO = (model) => {
  const { _id, name, status, image } = model;

  return {
    id: _id,
    name,
    status,
    image: fileUtils.createDownloadAddress("categories", image.name),
  };
};

module.exports = {
  toDTO,
  toItemListDTO,
};
