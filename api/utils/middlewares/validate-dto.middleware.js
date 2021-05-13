const joi = require("joi");

const ValidateDTO = (type, param) => {
  return (req, res, next) => {
    const schema = joi.object().keys(param);

    const result = schema.validate(req[type], {
      allowUnknown: false,
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
