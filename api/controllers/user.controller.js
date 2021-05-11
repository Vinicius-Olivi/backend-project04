const userService = require("../services/user.service");

const auth = async (req, res, next) => {
  const { email, password } = req.body;

  const serviceResult = await userService.athenticate(email, password);

  const resultReturn = serviceResult.success ? 200 : 401;
  const returnData = serviceResult.success
    ? { data: serviceResult.data }
    : { details: serviceResult.details };

  return res.status(resultReturn).send({
    message: serviceResult.message,
    ...returnData,
  });
};

module.exports = {
  auth,
};
