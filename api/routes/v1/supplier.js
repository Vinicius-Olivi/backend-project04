const Joi = require("Joi");
const ValidateDTO = require("../../utils/middlewares/validate-dto.middleware");
const supplierController = require("../../controllers/supplier.controller");
const productController = require("../../controllers/product.controller");

const fileUploadMiddleware = require("../../utils/middlewares/file-upload.middleware");
const authorizeMiddleware = require("../../utils/middlewares/authorization.middleware");

module.exports = (router) => {
  router
    .route("/supplier")
    .get(
      // authorizeMiddleware("*"),
      supplierController.list,
    )
    .post(
      ValidateDTO("body", {
        crn: Joi.string().required().messages({
          "any.required": "crn eh um campo obrigatorio",
          "string.empty": "crn nao deve ser vazio",
        }),
        // name: Joi.string().required().messages({
        //   "any.required": " Name eh um campo obrigatorio",
        //   "string.empty": " Name nao deve ser vazio",
        // }),
        fantasyName: Joi.string().required().messages({
          "any.required": "Fantasy Name eh um campo obrigatorio",
          "string.empty": "Fantasy Name nao deve ser vazio",
        }),
        address: Joi.string().required().messages({
          "any.required": "Address eh um campo obrigatorio",
          "string.empty": "Address nao deve ser vazio",
        }),
        uf: Joi.string().required().messages({
          "any.required": "City eh um campo obrigatorio",
          "string.empty": "City nao deve ser vazio",
        }),
        cidade: Joi.string().required().messages({
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

  router.route("/supplier/:supplierid").get(
    authorizeMiddleware("SEARCH_SUPPLIER_ID"),
    ValidateDTO("params", {
      supplierid: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          "any.required": `"supplier id" é um campo obrigatório`,
          "string.empty": `"supplier id" não deve ser vazio`,
          "string.pattern.base": `"supplier id" fora do formato esperado`,
        }),
    }),
    supplierController.searchById,
  );

  router
    .route("/supplier/:supplierid/likes")
    .get(
      //authorizeMiddleware('SEARCH_SUPPLIER'),
      ValidateDTO("params", {
        supplierid: Joi.string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            "any.required": `"supplier id" é um campo obrigatório`,
            "string.empty": `"supplier id" não deve ser vazio`,
            "string.pattern.base": `"supplier id" fora do formato esperado`,
          }),
      }),
      supplierController.likesReceived,
    )
    .post(
      authorizeMiddleware("CREATE_LIKE"),
      ValidateDTO("params", {
        supplierid: Joi.string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            "any.required": `"supplier id" é um campo obrigatório`,
            "string.empty": `"supplier id" não deve ser vazio`,
            "string.pattern.base": `"supplier id" fora do formato esperado`,
          }),
      }),
      supplierController.receiveLikes,
    )

    .delete(
      authorizeMiddleware("DELETE_LIKE"),
      ValidateDTO("params", {
        supplierid: Joi.string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            "any.required": `"supplier id" é um campo obrigatório`,
            "string.empty": `"supplier id" não deve ser vazio`,
            "string.pattern.base": `"supplier id" fora do formato esperado`,
          }),
      }),
      supplierController.likesDelete,
    );

  router.route("/supplier/:supplierid/activate").put(
    authorizeMiddleware("ACTIVATE_SUPPLIER"),
    ValidateDTO("params", {
      supplierid: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          "any.required": `"supplier id " é um campo obrigatório`,
          "string.empty": `"supplier id " não deve ser vazio`,
          "string.pattern.base": `"supplier id " fora do formato esperado`,
        }),
    }),
    supplierController.activate,
  );

  router.route("/supplier/:supplierid/inactivate").put(
    authorizeMiddleware("INACTIVATE_SUPPLIER"),
    ValidateDTO("params", {
      supplierid: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          "any.required": `"supplier id " é um campo obrigatório`,
          "string.empty": `"supplier id " não deve ser vazio`,
          "string.pattern.base": `"supplier id " fora do formato esperado`,
        }),
    }),
    supplierController.inactivate,
  );

  router
    .route("/supplier/:supplierid/product")
    .get(
      authorizeMiddleware("SEARCH_SUPPLIER_PRODUCT"),
      ValidateDTO("params", {
        supplierid: Joi.string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            "any.required": `"supplier id" é um campo obrigatório`,
            "string.empty": `"supplier id" não deve ser vazio`,
            "string.pattern.base": `"supplier id" fora do formato esperado`,
          }),
      }),
      supplierController.searchProductsBySupplier,
    )
    .post(
      authorizeMiddleware("CREATE_PRODUCT"),
      fileUploadMiddleware("products"),
      ValidateDTO("params", {
        supplierid: Joi.string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            "any.required": `"supplier id" é um campo obrigatório`,
            "string.empty": `"supplier id" não deve ser vazio`,
            "string.pattern.base": `"supplier id" fora do formato esperado`,
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
              "string.pattern.base": `"category id" fora do formato esperado`,
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

  router.route("/supplier/:supplierid/product/:productid").delete(
    authorizeMiddleware("REMOVE_PRODUCT"),
    ValidateDTO("params", {
      supplierid: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          "any.required": `"supplier id" é um campo obrigatório`,
          "string.empty": `"supplier id" não deve ser vazio`,
          "string.pattern.base": `"supplier id" fora do formato esperado`,
        }),
      productid: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          "any.required": `"supplier id" é um campo obrigatório`,
          "string.empty": `"supplier id" não deve ser vazio`,
          "string.pattern.base": `"supplier id" fora do formato esperado`,
        }),
    }),
    productController.remove,
  );
};
