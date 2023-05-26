const getPagination = (page, size) => {
  page = page - 1;
  const limit = size ? size : 5;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

module.exports = { getPagination };
