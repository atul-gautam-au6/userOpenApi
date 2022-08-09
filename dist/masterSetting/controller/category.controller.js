"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
const mongoose_2 = require("mongoose");
const category_service_1 = require("../services/category.service");
const http_exception_filter_1 = require("../../auth/exceptions/http.exception.filter");
const logging_interceptor_1 = require("../../auth/exceptions/logging.interceptor");
let CategoryController = class CategoryController {
    constructor(categoryModel, categoryService) {
        this.categoryModel = categoryModel;
        this.categoryService = categoryService;
    }
    async createCategory(data) {
        if (!data.name || !data.status) {
            return {
                errorCode: 403,
                errorMessage: 'Name and status fields are required*',
            };
        }
        const newCategory = await this.categoryService.insertCategory(data.name, data.status, false, false);
        return {
            successCode: 201,
            successMessage: 'category create success',
            list: newCategory,
        };
    }
    async updateCategory(data) {
        const getcategory = await this.categoryService.updateCategory(data.id, data.name, data.status, false, false);
        return {
            successCode: 200,
            successMessage: 'category update success',
            list: getcategory,
        };
    }
    async getCategoryById(categoryId) {
        const getCategory = await this.categoryService.getCategoryByid(categoryId);
        return {
            successCode: 200,
            successMessage: 'category details ',
            list: getCategory,
        };
    }
    async createCategoryPodcast(data) {
        const newCategory = await this.categoryService.insertCategory(data.name, data.status, true, false);
        return {
            successCode: 201,
            successMessage: 'category podcast create success',
            list: newCategory,
        };
    }
    async updateCategoryPodcast(data) {
        const getCategory = await this.categoryService.updateCategory(data.id, data.name, data.status, true, false);
        return {
            successCode: 200,
            successMessage: 'category podcats update success ',
            list: getCategory,
        };
    }
    async getCategoryPodcastById(categoryId) {
        const getCategory = await this.categoryService.getCategoryByid(categoryId);
        return {
            successCode: 200,
            successMessage: 'category podcats detail  ',
            list: getCategory,
        };
    }
    async createCategoryQuestion(req, data) {
        const newCategory = await this.categoryService.insertCategory(data.name, data.status, false, true);
        return {
            successCode: 201,
            successMessage: 'category question create success',
            list: newCategory,
        };
    }
    async updateCategoryQuestion(data) {
        const getCategory = await this.categoryService.updateCategory(data.id, data.name, data.status, false, true);
        return {
            successCode: 200,
            successMessage: 'category question detail',
            list: getCategory,
        };
    }
    async getCategoryQuById(categoryId) {
        const getCategory = await this.categoryService.getCategoryByid(categoryId);
        return {
            successCode: 200,
            successMessage: 'category question detail  ',
            list: getCategory,
        };
    }
    async getAllcategories(pageSize, newPage, searchKey, type) {
        const pagination = {
            page: newPage || 1,
            size: pageSize || 10,
            searchKey: searchKey || '',
        };
        const result = await this.categoryService.getAllCategory(pagination.page, pagination.size, pagination.searchKey, type);
        return {
            successCod: 200,
            successMessage: 'all categories list',
            list: result,
        };
    }
};
__decorate([
    (0, common_1.Post)('createCategory'),
    (0, swagger_1.ApiOperation)({ summary: 'create category  from this api' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    example: 'any',
                    description: 'this is category name*',
                },
                status: {
                    type: 'booelan',
                    example: true,
                    description: 'this is status of category*',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'category create',
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'All field are required',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "createCategory", null);
__decorate([
    (0, common_1.Put)('updateCategory'),
    (0, swagger_1.ApiOperation)({ summary: 'update category  from this api' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                id: {
                    type: 'string',
                    example: 'any',
                    description: 'this is your category',
                },
                name: {
                    type: 'string',
                    example: 'any',
                    description: 'this is category name*',
                },
                status: {
                    type: 'boolean',
                    example: true,
                    description: 'this is status of category*',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'category update',
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'id field is required',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "updateCategory", null);
__decorate([
    (0, common_1.Get)('category/:categoryId'),
    (0, swagger_1.ApiOperation)({ summary: 'get category by id from this api' }),
    (0, swagger_1.ApiParam)({
        name: 'categoryId',
        example: 'any',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'category details',
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'id field are required',
    }),
    __param(0, (0, common_1.Param)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getCategoryById", null);
__decorate([
    (0, common_1.Post)('createCategoryPodcast'),
    (0, swagger_1.ApiOperation)({ summary: 'create category podcast from this api' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    example: 'any',
                    description: 'this is category podcast name*',
                },
                isPodcast: {
                    type: 'booelan',
                    example: true,
                    description: 'this is status of category podcast*',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'category podcast create',
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'All field are required',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "createCategoryPodcast", null);
__decorate([
    (0, common_1.Put)('updateCategoryPodcast'),
    (0, swagger_1.ApiOperation)({ summary: 'update category podcast from this api' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                id: {
                    type: 'string',
                    example: 'any',
                    description: 'this is your category podcast',
                },
                name: {
                    type: 'string',
                    example: 'any',
                    description: 'this is category podcast name*',
                },
                status: {
                    type: 'boolean',
                    example: true,
                    description: 'this is status of category*',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'category update',
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'id field is required',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "updateCategoryPodcast", null);
__decorate([
    (0, common_1.Get)('categoryPodcast/:categoryId'),
    (0, swagger_1.ApiOperation)({ summary: 'get category podcats by id from this api' }),
    (0, swagger_1.ApiParam)({
        name: 'categoryId',
        example: 'any',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'category podcats details',
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'id field are required',
    }),
    __param(0, (0, common_1.Param)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getCategoryPodcastById", null);
__decorate([
    (0, common_1.Post)('createCategoryQuestion'),
    (0, swagger_1.ApiOperation)({ summary: 'create category question from this api' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    example: 'any',
                    description: 'this is category question name*',
                },
                status: {
                    type: 'booelan',
                    example: true,
                    description: 'this is status of category question*',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'category create',
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'All field are required',
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "createCategoryQuestion", null);
__decorate([
    (0, common_1.Put)('updateCategoryQuestion'),
    (0, swagger_1.ApiOperation)({ summary: 'update category question from this api' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                id: {
                    type: 'string',
                    example: 'any',
                    description: 'this is your category question',
                },
                name: {
                    type: 'string',
                    example: 'any',
                    description: 'this is category name question*',
                },
                status: {
                    type: 'boolean',
                    example: true,
                    description: 'this is status of category question*',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'category update',
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'id field is required',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "updateCategoryQuestion", null);
__decorate([
    (0, common_1.Get)('categoryQuestion/:categoryId'),
    (0, swagger_1.ApiOperation)({ summary: 'get category question by id from this api' }),
    (0, swagger_1.ApiParam)({
        name: 'categoryId',
        example: 'any',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'category question details',
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'id field are required',
    }),
    __param(0, (0, common_1.Param)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getCategoryQuById", null);
__decorate([
    (0, common_1.Get)('categories/getAll'),
    __param(0, (0, common_1.Query)('pageSize')),
    __param(1, (0, common_1.Query)('newPage')),
    __param(2, (0, common_1.Query)('searchKey')),
    __param(3, (0, common_1.Query)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getAllcategories", null);
CategoryController = __decorate([
    (0, swagger_1.ApiTags)('master-setting'),
    (0, swagger_1.ApiSecurity)('bearer'),
    (0, common_1.UseFilters)(new http_exception_filter_1.HttpExceptionFilter()),
    (0, common_1.UseInterceptors)(new logging_interceptor_1.LoggingInterceptor()),
    (0, common_1.Controller)('admin'),
    __param(0, (0, mongoose_1.InjectModel)('category')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        category_service_1.CategoryService])
], CategoryController);
exports.CategoryController = CategoryController;
//# sourceMappingURL=category.controller.js.map