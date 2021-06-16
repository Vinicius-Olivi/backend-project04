const Joi = require("joi");

const ValidateDTO = (type, params, options = {}) => {
  return (req, res, next) => {
    console.log("####DTOType", type);

    const schema = Joi.object().keys(params);

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
