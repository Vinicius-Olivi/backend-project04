const ValidateDTO = require("../../utils/middlewares/validate-dto.middleware");
const categoryController = require("../../controllers/category.controller");
const Joi = require("joi");

module.exports = (router) => {
  router
    .route("/category")
    .get(categoryController.list)
    .post(
      ValidateDTO("body", {
        name: Joi.string().required().messages({
          "any.required": "name eh um campo obrigatorio",
          "string.empty": "name nao deve ser vazio",
        }),
        description: Joi.string().required().messages({
          "any.required": "description eh um campo obrigatorio",
          "string.empty": "description nao deve ser vazio",
        }),
        status: Joi.string().required().messages({
          "any.required": "status eh um campo obrigatorio",
          "boolean.empty": "status nao deve ser vazio",
        }),
      }),
      categoryController.create,
    );

  router
    .route("/category/:idcategory")
    .get(categoryController.searchById)
    .put(
      ValidateDTO("param", {
        idcategory: Joi.string().required().messages({
          "any.required": "idcategory eh um campo obrigatorio",
          "string.empty": "idcategory nao deve ser vazio",
        }),
      }),
      ValidateDTO("body", {
        name: Joi.string().required().messages({
          "any.required": "name eh um campo obrigatorio",
          "string.empty": "name nao deve ser vazio",
        }),
        description: Joi.string().required().messages({
          "any.required": "description eh um campo obrigatorio",
          "string.empty": "description nao deve ser vazio",
        }),
        status: Joi.string().required().messages({
          "any.required": "status eh um campo obrigatorio",
          "boolean.empty": "status nao deve ser vazio",
        }),
      }),
      categoryController.update,
    )
    .delete(
      ValidateDTO("param", {
        idcategory: Joi.string().required().messages({
          "any.required": "idcategory eh um campo obrigatorio",
          "string.empty": "idcategory nao deve ser vazio",
        }),
      }),
      categoryController.exclude,
    );
};
