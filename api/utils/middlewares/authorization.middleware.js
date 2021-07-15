const cryptoUitls = require("../crypto.utils");
const userService = require("../../services/user.service");

const authorizate = (route = "*") => {
  return async (req, res, next) => {
    const testRoute = route;

    const { token } = req.headers;

    if (!token) {
      return res.status(403).send({
        message: "user não autorizado.",
      });
    }

    if (!cryptoUitls.tokenValid(token)) {
      return res.status(401).send({ message: "user não autenticado." });
    }

    const { id, email, userType } = cryptoUitls.decodesToken(token);
    //validar se o email no token existe
    if (!(await userService.ifEmailExist(email))) {
      return res.status(403).send({
        message: "user não autorizado.",
      });
    }

    if (testRoute != "*") {
      if (!userService.functionalitiesProfileValidate(userType, testRoute))
        return res.status(403).send({
          message: "user não autorizado.",
        });
    }

    req.user = {
      id,
      email,
      userType,
    };

    return next();
  };
};

module.exports = authorizate;
