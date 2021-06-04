const { category } = require("../models/index");
const categoryMapper = require("../mappers/category.mapper");
const fileUtils = require("../utils/file.utils");

const searchById = async (categoryId) => {
  const categoryDB = await category.findById(categoryId);

  if (categoryDB) return categoryMapper.toDTO(categoryDB);

  return;
};

const listAll = async () => {
  const categoryListDB = await category.find({});

  return categoryListDB.map((categoryDB) => {
    return categoryMapper.toItemListDTO(categoryDB);
  });
};

const categoryCreate = async (model) => {
  //tratar nomes existentes

  //incluir nova categoria

  const newCategory = await category.create({
    name: model.name,
    description: model.description,
    status: model.status,
    image: {
      originalName: model.image.originalName,
      name: model.image.newName,
      type: model.image.type,
    },
  });

  fileUtils.move(model.image.originalPath, model.image.newPath);

  return {
    success: true,
    message: "cadastro realizado com sucesso",
    data: categoryMapper.toDTO(newCategory),
  };
};

const exclude = async (categoryId) => {
  const categoryDB = await category.findOne({
    _id: categoryId,
  });

  console.log(categoryDB);

  const categoryDBASsJson = categoryDB.toJSON();
  console.log(categoryDBASsJson);

  if (!categoryDB) {
    return {
      success: false,
      message: "nao foi possivel realizar a operacao",
      details: ["categoria nao existe"],
    };
  }
  console.log(categoryDB);

  const { image } = categoryDB;
  fileUtils.remove("categories", image.name);

  await category.remove(categoryDB);

  return {
    success: true,
    message: "operacao realizada com sucesso",
  };
};

const categoryUpdate = async (categoryId, model) => {
  const categoryDB = await category.findOne({
    _id: categoryId,
  });

  if (!categoryDB) {
    return {
      success: false,
      message: "nao foi possivel realizar a operacao",
      details: ["categoriaid nao existe"],
    };
  }

  fileUtils.remove("categories", categoryDB.image.name);

  categoryDB.name = model.name;
  categoryDB.description = model.description;
  categoryDB.status = model.status;

  if (model.image) {
    fileUtils.remove("categories", categoryDB.image.name);
    fileUtils.move(model.image.originalPath, model.image.newPath);
    categoryDB.image = {
      originalName: model.image.originalName,
      name: model.image.newName,
      type: model.image.type,
    };
  }

  await categoryDB.save();

  return {
    success: true,
    message: "operacao realizada com sucessso",
    data: categoryMapper.toDTO(categoryDB),
  };
};

module.exports = {
  searchById,
  listAll,
  categoryCreate,
  exclude,
  categoryUpdate,
};
