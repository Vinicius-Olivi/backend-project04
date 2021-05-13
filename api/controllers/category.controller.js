const create = (req, res, next) => {
  return res.status(200).send();
};

const list = (req, res, next) => {
  return res.satus(200).send([]);
};

module.exports = {
  list,
  create,
};
