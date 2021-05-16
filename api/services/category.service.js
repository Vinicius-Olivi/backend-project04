const { category } = require("../models/index");
const categoryMapper = require("../mappers/category.mapper");

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
  });

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
