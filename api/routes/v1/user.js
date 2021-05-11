const userController = require("../../controllers/user.controller");
const {
  ValidateDTO,
} = require("../../utils/middlewares/validate-dto.middleware.js");
const joi = require("joi");

module.exports = (router) => {
  router.route("/auth").post(
    ValidateDTO("body", {
      email: joi.string().required().messages({
        "any.required": "email eh um campo obrigatorio",
        "string.empty": "email nao deve ser vazio",
      }),
      password: joi.string().required().messages({
        "any.required": "email eh um campo obrigatorio",
        "string.empty": "email nao deve ser vazio",
      }),
    }),
    userController.auth,
  );
};
