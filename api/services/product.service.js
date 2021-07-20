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

  const newProduct = await product.create({
    name: model.name,
    description: model.description,
    price: model.price,
    category: model.categoryid,
    supplier: model.supplierid,
    image: {
      originalName: model.image.originalName,
      name: model.image.newName,
      type: model.image.type,
    },
  });

  categoryDB.products = [...categoryDB.products, newProduct._id];

  supplierDB.products = [...supplierDB.products, newProduct._id];

  await Promise.all([categoryDB.save(), supplierDB.save()]);

  fileUtils.move(model.image.oldPath, model.image.newPath);

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
    mongoFilter.name = { $regex: ".*" + filters.nameLike + ".*" };

  const resultDB = await product.find(mongoFilter).populate("category");
  return resultDB.map((item) => {
    return productMapper.toItemListDTO(item);
  });
};

const exclude = async ({ supplierId, productId, userId }) => {
  const [supplierDB, productDB] = await Promise.all([
    supplier.findById(supplierId),
    product.findById(productId),
  ]);

  // supplier existe
  if (!supplierDB) {
    return {
      success: false,
      message: "operação não pode ser realizada",
      details: ["O supplier informado não existe."],
    };
  }

  if (supplierId !== userId) {
    return {
      success: false,
      message: "operação não pode ser realizada",
      details: ["O product a ser excluido não pertence ao fornecedor."],
    };
  }

  if (!productDB) {
    return {
      success: false,
      message: "operação não pode ser realizada",
      details: ["O product informado não existe."],
    };
  }

  if (productDB.supplier.toString() !== supplierId) {
    return {
      success: false,
      message: "operação não pode ser realizada",
      details: ["O supplier informado e inválido."],
    };
  }

  const categoryDB = await category.findById(productDB.category);
  categoryDB.products = categoryDB.products.filter((item) => {
    return item.toString() !== productId;
  });
  supplierDB.products = supplierDB.products.filter((item) => {
    return item.toString() !== productId;
  });
  await Promise.all([
    categoryDB.save(),
    supplierDB.save(),
    product.deleteOne(productDB),
  ]);

  const { image } = productDB;
  fileUtils.remove("products", image.name);

  return {
    success: true,
    message: "operação realizada com sucesso",
    data: {
      id: productId,
      name: productDB.name,
    },
  };
};

module.exports = {
  create,
  searchByFilters,
  exclude,
};
