const fileUtils = require("../utils/file.utils");

const toItemListDTO = (model) => {
  const { _id, name, description, price, image } = model;
  return {
    id: _id,
    name,
    description,
    price: `£ ${price.toString().replace(".", ",")}`,
    image: fileUtils.createDownloadAddress("products", image.name),
  };
};

module.exports = {
  toItemListDTO,
};
