const fileUtils = require("../utils/file.utils");

const toItemListDTO = (model) => {
  const { _id, name, description, price, image, category, supplier } = model;
  return {
    id: _id,
    name,
    description,
    supplierId: supplier,
    categoryName: category.name,
    categoryId: category._id,
    price: `£ ${price.toString().replace(".", ",")}`,
    // image: fileUtils.createDownloadAddress("products", image.name),
  };
};

module.exports = {
  toItemListDTO,
};
