const { product, category, supplier } = require("../models/index");
const fileUtils = require("../utils/file.utils");
const productMapper = require("../mappers/product.mapper");

const create = async (model) => {
  const [categoryDB, supplierDB] = await Promise.all([
    category.findById(model.categoryid),
    supplier.findById(model.supplierid),
  ]);

  if (!supplierDB) {
    return {
      success: false,
      message: "operação não pode ser realizada",
      details: [
        "Não existe fornecedor cadastrado para o supplier id informado",
      ],
    };
  }

  if (!categoryDB) {
    return {
      success: false,
      message: "operação não pode ser realizada",
      details: [
        "Não existe fornecedor cadastrado para o category id informado",
      ],
    };
  }
  console.log("~~~~~~", supplierDB);

  const newProduct = await product.create({
    name: model.name,
    description: model.description,
    price: model.price,
    category: model.categoryid,
    supplier: model.supplierid,
    // image: {
    //   originalName: model.image.originalName,
    //   name: model.image.newName,
    //   type: model.image.type,
    // },
  });

  categoryDB.products = [...categoryDB.products, newProduct._id];

  supplierDB.products = [...supplierDB.products, newProduct._id];

  await Promise.all([categoryDB.save(), supplierDB.save()]);

  // await category.findByIdAndUpdate(
  //   model.categoryid,
  //   { $push: { products: newProduct._id } },
  //   { new: true, useFindAndModify: false },
  // );

  // await supplier.findByIdAndUpdate(
  //   model.categoryid,
  //   { $push: { products: newProduct._id } },
  //   { new: true, useFindAndModify: false },
  // );

  // fileUtils.move(model.image.originalPath, model.image.newPath);

  return {
    success: true,
    message: "cadastro realizado com sucesso",
    data: {
      id: newProduct._id,
      name: newProduct.name,
    },
  };
};

const searchByFilters = async (filters) => {
  const mongoFilter = {};

  if (filters.categoryid) mongoFilter.category = filters.categoryid;

  if (filters.supplierid) mongoFilter.supplier = filters.supplierid;

  if (filters.nameLike)
    mongoFilter.name = { regex: ".*" + filters.nameLike + ".*" };

  console.log("mongoFilterrrr", mongoFilter);

  const resultDB = await product.find(mongoFilter);
  return resultDB.map((item) => {
    return productMapper.toItemListDTO(item);
  });
};

module.exports = {
  create,
  searchByFilters,
};
