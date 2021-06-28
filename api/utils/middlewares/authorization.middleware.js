const cryptoUitls = require("../crypto.utils");
const userService = require("../../services/user.service");

const authorizate = (req, res, next, route = "*") => {
  console.log("@@@@@@@@@@@", route);

  return async (req, res, next) => {
    console.log("@@@@@@@@@@@", route);

    const { token } = req.headers;

    if (!token) {
      return res.status(403).send({
        message: "user não autorizado.",
      });
    }

    //validar o token informado
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

    //verificar se o user informado pussui o privilégio necessario  para executar a route.
    if (route != "*") {
      if (!userService.functionalitiesProfileValidate(userType, route))
        return res.status(403).send({
          message: "user não autorizado.",
        });
    }

    //incluir user na request
    req.user = {
      id,
      email,
      userType,
    };

    return next();
  };
};

module.exports = authorizate;
