const toListItemDTO = (model) => {
  const { _id, email, name, status } = model;

  return {
    id: _id,
    name,
    email,
    status,
  };
};

const toDTO = (model) => {
  return {
    ...model,
  };
};

module.exports = {
  toListItemDTO,
  toDTO,
};
