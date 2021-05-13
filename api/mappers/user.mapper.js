const setUserType = (type) => {
  switch (type) {
    case "admin":
      return 1;

    default:
      break;
  }
};

const toUserDTO = (model) => {
  const { id, email, kind, name, fantasyName } = model;

  return {
    id,
    email,
    name: name ? name : fantasyName,
    userType: setUserType(kind),
  };
};

module.exports = {
  toUserDTO,
};
