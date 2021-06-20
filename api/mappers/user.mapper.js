const setUserType = (type) => {
  switch (type) {
    case "admin":
      return 1;

    case "supplier":
      return 2;

    case "client":
      return 3;

    default:
      break;
  }
};

const toUserDTO = (model) => {
  const { id, email, kind, name, fantasyName } = model;

  console.log("name: ", name);

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
