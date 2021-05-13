const userController = require("../../controllers/user.controller");
const ValidateDTO = require("../../utils/middlewares/validate-dto.middleware.js");
const Joi = require("joi");

module.exports = (router) => {
  router.route("/auth").post(
    ValidateDTO("body", {
      email: Joi.string().required().messages({
        "any.required": "email eh um campo obrigatorio",
        "string.empty": "email nao deve ser vazio",
      }),
      password: Joi.string().required().messages({
        "any.required": "password eh um campo obrigatorio",
        "string.empty": "password nao deve ser vazio",
      }),
    }),
    userController.auth,
  );
};
