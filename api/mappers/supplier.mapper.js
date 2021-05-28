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
  return {};
};

module.exports = {
  toListItemDTO,
  toDTO,
};
