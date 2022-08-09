"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationUsable = exports.validateEmail = void 0;
var validateEmail = function (email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};
exports.validateEmail = validateEmail;
const paginationUsable = (page, size, search) => {
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
exports.paginationUsable = paginationUsable;
//# sourceMappingURL=email.validator.js.map