const Joi = require("joi");
const ValidateDTO = require("../../utils/middlewares/validate-dto.middleware");
const fileUploadMiddleware = require("../../utils/middlewares/file-upload.middleware");
const categoryController = require("../../controllers/category.controller");
const authorizeMiddleware = require("../../utils/middlewares/authorization.middleware");

module.exports = (router) => {
  router
    .route("/category")
    .get(
      // authorizeMiddleware("SEARCH_CATEGORY"),
      categoryController.list,
    )
    .post(
      authorizeMiddleware("CREATE_CATEGORY"),
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
    .route("/category/:categoryid")
    .get(
      authorizeMiddleware("SEARCH_CATEGORY"),
      ValidateDTO("params", {
        categoryid: Joi.string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            "any.required": "categoryid eh um campo obrigatorio",
            "string.empty": "categoryid nao deve ser vazio",
          }),
      }),
      categoryController.searchById,
    )
    .delete(
      authorizeMiddleware("DELETE_CATEGORY"),
      ValidateDTO("params", {
        categoryid: Joi.string()
          // .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            "any.required": "categoryid eh um campo obrigatorio",
            "string.empty": "categoryid nao deve ser vazio",
            // "string.regex": `"categoria id" fora do formato experado`,
          }),
      }),
      categoryController.exclude,
    )
    .put(
      authorizeMiddleware("UPDATE_CATEGORY"),
      // fileUploadMiddleware("categories", true),
      ValidateDTO("params", {
        categoryid: Joi.string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            "any.required": `"categoria id" é um campo obrigatório`,
            "string.empty": `"categoria id" não deve ser vazio`,
            "string.regex": `"categoria id" fora do formato experado`,
          }),
      }),
      ValidateDTO(
        "body",
        {
          name: Joi.string().required().messages({
            "any.required": `"name" é um campo obrigatório`,
            "string.empty": `"name" não deve ser vazio`,
          }),
          description: Joi.string().required().messages({
            "any.required": `"description" é um campo obrigatório`,
            "string.empty": `"description" não deve ser vazio`,
          }),
          status: Joi.boolean().required().messages({
            "any.required": `"status" é um campo obrigatório`,
            "booleam.empty": `"status" não deve ser vazio`,
          }),
        },
        {
          allowUnknown: true,
        },
      ),
      categoryController.update,
    );
};
