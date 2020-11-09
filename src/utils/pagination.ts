const pagination = (page = 1, limit = 10, total = 0) => {
  let pages = 1;

  if (page !== undefined) {
    pages = Math.ceil(total / limit) || 1;
  }

  const paginationOpts = {
    currentPage: page,
    totalItems: total,
    totalPages: pages,
    limit,
  };

  return paginationOpts;
};

export default pagination;