const fileUtils = require("../utils/file.utils");

const toItemListDTO = (model) => {
  const { _id, name, status, image, description } = model;

  return {
    id: _id,
    name,
    status,
    description,
    image: fileUtils.createDownloadAddress("categories", image.name || ""),
  };
};

const toDTO = (model) => {
  const { _id, name, description, status, image } = model;

  return {
    id: _id,
    name,
    description,
    status,
    image: fileUtils.createDownloadAddress("categories", image.name || ""),
  };
};

module.exports = {
  toDTO,
  toItemListDTO,
};
