const toListItemDTO = (model) => {
  const { _id, crn, fantasyName, status } = model;
  return {
    id: _id,
    crn,
    fantasyName,
    status,
  };
};

const toDTO = (model) => {
  const {
    _id,
    likes,
    password,
    createdAt,
    updatedAt,
    __v,
    kind,
    products,
    ...residual
  } = model;
  return {
    id: _id,
    likes: likes.map((item) => {
      return {
        id: item._id,
        clientId: item.client._id,
        clientName: item.client.name,
      };
    }),
    products: products.map((item) => {
      return {
        id: item._id,
        supplierId: item.supplier,
        // clientId: item.client._id,
        // clientName: item.client.name,
      };
    }),
    ...residual,
  };
};

module.exports = {
  toListItemDTO,
  toDTO,
};
