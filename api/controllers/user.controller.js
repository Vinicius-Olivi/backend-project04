const userService = require("../services/user.service");

const auth = async (req, res, next) => {
  const { email, password } = req.body;

  const serviceResult = await userService.authenticate(email, password);

  return res.status(200).send({
    message: serviceResult.message,
    data: serviceResult.data,
  });
};

module.exports = {
  auth,
};
