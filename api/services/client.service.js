const { ifEmailExist } = require("./user.service");
const { client } = require("../models/index");
const { toListItemDTO } = require("../mappers/client.mapper");
const { createHash } = require("../utils/crypto.utils");

const create = async (model) => {
  const { email, password, ...residual } = model;

  //TODO: email ja existente
  if (await ifEmailExist(email))
    return {
      success: false,
      message: "operação não pode ser realizada",
      details: ["Já existe usuário cadastrado para o email informado"],
    };

  const newClient = await client.create({
    email,
    ...residual,
    password: createHash(password),
    status: "Active",
  });

  return {
    success: true,
    message: "Operação realizada com success",
    data: {
      ...toListItemDTO(newClient),
    },
  };
};

const list = async () => {
  return (await client.find({})).map((item) => {
    const { _id, name, birthdate, uf, cidade, email, ...residual } = item;
    return {
      id: _id,
      name,
      birthdate,
      uf,
      cidade,
      email,
    };
  });
};

const searchById = async ({ user, clientid }) => {
  //TODO: validando se adm ou o proprio client
  if (user.userType !== 1) {
    if (user.id !== clientid)
      message: {
        ("usuario nao autorizado");
      }
  }

  const resultDB = await client.find({ _id: clientid }).populate({
    path: "likes",
    model: "like",
    populate: {
      path: "supplier",
      model: "supplier",
    },
  });

  if (!resultDB[0])
    message: {
      ("Cliente não encontrado");
    }

  const { _id, likes, name, email } = resultDB[0];

  return {
    data: {
      id: _id,
      name,
      email,

      likes: likes
        ? likes.reduce((acc, item) => {
            const { fantasyName, email } = item.supplier;

            return [
              ...acc,
              {
                id: item._id,
                fantasyName,
                email,
              },
            ];
          }, [])
        : [],
    },
  };
};

module.exports = {
  create,
  list,
  searchById,
};
