const Joi = require("Joi").extend(require("@joi/date"));
const ValidateDTO = require("../../utils/middlewares/validate-dto.middleware");
const clientController = require("../../controllers/client.controller");

module.exports = (router) => {
  router.route("/client").post(
    ValidateDTO("body", {
      name: Joi.string().required().messages({
        "any.required": `"name" é um campo obrigatório`,
        "string.empty": `"name" não deve ser vazio`,
      }),

      birthday: Joi.date().format("DD/MM/YYYY").required().messages({
        "any.required": `"birthday" é um campo obrigatório`,
        "date.format": `"birthday" deve ser uma data válida "{#format}"`,
      }),

      uf: Joi.string().required().messages({
        "any.required": `"uf" é um campo obrigatório`,
        "string.empty": `"uf" não deve ser vazio`,
      }),
      city: Joi.string().required().messages({
        "any.required": `"city" é um campo obrigatório`,
        "string.empty": `"city" não deve ser vazio`,
      }),
      email: Joi.string().email().required().messages({
        "any.required": `"email" é um campo obrigatório`,
        "string.empty": `"email" não deve ser vazio`,
      }),
      password: Joi.string().required().messages({
        "any.required": `"password" é um campo obrigatório`,
        "string.empty": `"password" não deve ser vazio`,
      }),
    }),
    clientController.create,
  );

  router.route("/client/:clientid").get(
    ValidateDTO("params", {
      clientid: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          "any.required": `"client id" é um campo obrigatório`,
          "string.empty": `"client id" não deve ser vazio`,
          "string.pattern.base": `"client id" fora do formato experado`,
        }),
    }),
    clientController.searchById,
  );

  router.route("/client/:clientid/likes").get(
    ValidateDTO("params", {
      clientid: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          "any.required": `"client id" é um campo obrigatório`,
          "string.empty": `"client id" não deve ser vazio`,
          "string.pattern.base": `"client id" fora do formato experado`,
        }),
    }),
    clientController.searchLikes,
  );
};
