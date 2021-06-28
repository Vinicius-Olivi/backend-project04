const { supplier, client, like } = require("../models/index");

const create = async (supplierid, userid) => {
  const [supplierDB, clientDB] = await Promise.all([
    supplier.findById(supplierid),
    client.findById(clientid),
  ]);

  if (!supplierDB) {
    return {
      success: false,
      message: "operação não pode ser realizada",
      details: ["o supplier pesquisado não existe"],
    };
  }

  const likeDB = await like.create({
    supplier: supplierid,
    client: userid,
  });

  supplierDB.likes = [supplierDB.likes, likeDB._id];
  clientDB.likes = [...clientDB.likes, likeDB._id];

  await Promise.all([supplierDB.save(), clientDB.save()]);

  return {
    success: true,
    data: {
      id: likeDB._id,
      supplier: supplierDB.fantasyName,
      client: clientDB.name,
    },
  };
};

const remove = async (supplierid, userid) => {
  const [supplierDB, userDB, likeDB] = await Promise.all([
    supplier.findById(supplierid),
    client.findById(userid),
    like.findOne({ supplier: supplierid, client: userid }),
  ]);

  if (!supplierDB) {
    return {
      success: false,
      message: "operação não pode ser realizada",
      details: ["o supplier informado não existe"],
    };
  }

  if (!likeDB) {
    return {
      success: false,
      message: "operação não pode ser realizada",
      details: ["não existem likes para os dados informados"],
    };
  }

  supplierDB.likes = supplierDB.likes.filter((item) => {
    return item.toString() !== likeDB._id.toString();
  });

  const like_id = likeDB._id.toString();

  userDB.likes = userDB.likes.filter((item) => {
    return item.toString() !== likeDB._id.toString();
  });

  await Promise.all([supplierDB.save(), userDB.save(), like.remove(likeDB)]);

  return {
    success: false,
    message: "operação realizada com success",
    data: {
      id: like_id,
    },
  };
};

module.exports = {
  create,
  remove,
};
