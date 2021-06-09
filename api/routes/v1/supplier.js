const Joi = require("Joi");
const supplierController = require("../../controllers/supplier.controller");
const productController = require("../../controllers/product.controller");
const ValidateDTO = require("../../utils/middlewares/validate-dto.middleware");
const fileUploadMiddleware = require("../../utils/middlewares/file-upload.middleware");

module.exports = (router) => {
  router
    .route("/supplier")
    .get(supplierController.list)
    .post(
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

  router.route("/supplier/:supplierid/activate").put(
    ValidateDTO("params", {
      supplierid: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          "any.required": `"supplier id " é um campo obrigatório`,
          "string.empty": `"supplier id " não deve ser vazio`,
          "string.pattern.base": `"supplier id " fora do formato experado`,
        }),
    }),
    supplierController.activate,
  );
  router.route("/supplier/:supplierid/inactivate").put(
    ValidateDTO("params", {
      supplierid: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          "any.required": `"supplier id " é um campo obrigatório`,
          "string.empty": `"supplier id " não deve ser vazio`,
          "string.pattern.base": `"supplier id " fora do formato experado`,
        }),
    }),
    supplierController.inactivate,
  );

  router
    .route("/supplier/:supplierid/product")
    .get(
      ValidateDTO("params", {
        supplierid: Joi.string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            "any.required": `"supplier id" é um campo obrigatório`,
            "string.empty": `"supplier id" não deve ser vazio`,
            "string.pattern.base": `"supplier id" fora do formato experado`,
          }),
      }),
      supplierController.seacrhProductsBySupplier,
    )
    .post(
      // fileUploadMiddleware("products"),
      ValidateDTO("params", {
        supplierid: Joi.string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            "any.required": `"supplier id" é um campo obrigatório`,
            "string.empty": `"supplier id" não deve ser vazio`,
            "string.pattern.base": `"supplier id" fora do formato experado`,
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
          categoryid: Joi.string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required()
            .messages({
              "any.required": `"category id" é um campo obrigatório`,
              "string.empty": `"category id" não deve ser vazio`,
              "string.pattern.base": `"category id" fora do formato experado`,
            }),
          price: Joi.number().required().messages({
            "any.required": `"price" é um campo obrigatório`,
          }),
        },
        {
          allowUnknown: true,
        },
      ),
      productController.create,
    );
};
