const Joi = require("joi");

const ValidateDTO = (type, param, options = {}) => {
  return async (req, res, next) => {
    console.log("####DTOType", req[type]);

    const schema = Joi.object().keys(param);

    const result = schema.validate(req[type], {
      allowUnknown: false,
      ...options,
    });

    if (result.error) {
      const messages = result.error.details.reduce((acc, item) => {
        return [...acc, item.message];
      }, []);

      return res.status(400).send({
        success: false,
        details: [...messages],
      });
    }

    return next();
  };
};

module.exports = ValidateDTO;
