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

module.exports = {
  create,
};
