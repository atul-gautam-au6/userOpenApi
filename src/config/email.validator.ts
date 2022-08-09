export var validateEmail = function (email) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

export const paginationUsable = (page, size, search) => {
  if (!page || page == '0' || page == 0) {
    page = 1;
  }
  if (!search) {
    search = '';
  }
  if (!size) {
    size = 10;
  }
  const limit = parseInt(size);
  const skip = (page - 1) * size;
  return {
    limit,
    skip,
    search,
  };
};
