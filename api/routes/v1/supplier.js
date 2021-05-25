const Joi = require("joi");
const supplierController = require("../../controllers/supplier.controller");
const ValidateDTO = require("../../utils/middlewares/validate-dto.middleware");
module.exports = (router) => {
  router.route("/supplier").post(
    ValidateDTO("body", {
      crn: Joi.string().required().messages({
        "any.required": "crn eh um campo obrigatorio",
        "string.empty": "crn nao deve ser vazio",
      }),
      fantasyName: Joi.string().required().messages({
        "any.required": "Fantasy Name eh um campo obrigatorio",
        "string.empty": "Fantasy Name nao deve ser vazio",
      }),
      address: Joi.string().required().messages({
        "any.required": "Address eh um campo obrigatorio",
        "string.empty": "Address nao deve ser vazio",
      }),
      city: Joi.string().required().messages({
        "any.required": "City eh um campo obrigatorio",
        "string.empty": "City nao deve ser vazio",
      }),
      responsable: Joi.string().required().messages({
        "any.required": "Responsable eh um campo obrigatorio",
        "string.empty": "Responsable nao deve ser vazio",
      }),
      phone: Joi.number().required().messages({
        "any.required": "Phone eh um campo obrigatorio",
        "number.empty": "Phone nao deve ser vazio",
      }),
      email: Joi.string().required().messages({
        "any.required": "email eh um campo obrigatorio",
        "boolean.empty": "email nao deve ser vazio",
      }),
      password: Joi.string().required().messages({
        "any.required": "password eh um campo obrigatorio",
        "boolean.empty": "password nao deve ser vazio",
      }),
    }),
    supplierController.create,
  );
};
