const { category } = require("../models/index");
const categoryMapper = require("../mappers/category.mapper");
const fileUtils = require("../utils/middlewares/file.utils");

const listAll = async () => {
  const categoryListDB = await category.find({});

  return categoryListDB.map((categoryDB) => {
    return categoryMapper.toDTO(categoryDB);
  });
};

const categoryCreate = async (model) => {
  //tratar nomes existentes

  //incluir nova categoria

  const newCategory = category.create({
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

module.exports = {
  listAll,
  categoryCreate,
};
