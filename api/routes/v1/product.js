const Joi = require("Joi");
const ValidateDTO = require("../../utils/middlewares/validate-dto.middleware");
const fileUploadMiddleware = require("../../utils/middlewares/file-upload.middleware");
const productController = require("../../controllers/product.controller");

module.exports = (router) => {
  router.route("/product").get(
    ValidateDTO("query", {
      categoryid: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .messages({
          "any.required": `"category id" é um campo obrigatório`,
          "string.empty": `"category id" não deve ser vazio`,
          "string.pattern.base": `"category id" fora do formato experado`,
        }),
      supplierid: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .messages({
          "any.required": `"suppleir id" é um campo obrigatório`,
          "string.empty": `"suppleir id" não deve ser vazio`,
          "string.pattern.base": `"suppleir id" fora do formato experado`,
        }),
      nameLike: Joi.string(),
    }),
    productController.list,
  );
};
