const Joi = require("joi");
const ValidateDTO = require("../../utils/middlewares/validate-dto.middleware");
const fileUploadMiddleware = require("../../utils/middlewares/file-upload.middleware");
const categoryController = require("../../controllers/category.controller");

module.exports = (router) => {
  router
    .route("/category")
    .get(categoryController.list)
    .post(
      fileUploadMiddleware("categories"),
      ValidateDTO(
        "body",
        {
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
        },
        {
          allowUnknown: true,
        },
      ),
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
