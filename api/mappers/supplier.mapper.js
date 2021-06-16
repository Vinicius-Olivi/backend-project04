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

  const { _id, password, createdAt, updatedAt,  __v, kind, products, ...rest } = model
  return {
    id: _id,
    ...rest
  };
};

module.exports = {
  toListItemDTO,
  toDTO,
};
