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
exports.CmsController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
const mongoose_2 = require("mongoose");
const cms_service_1 = require("../service/cms.service");
const http_exception_filter_1 = require("../../auth/exceptions/http.exception.filter");
const logging_interceptor_1 = require("../../auth/exceptions/logging.interceptor");
let CmsController = class CmsController {
    constructor(cmsModel, cmsService) {
        this.cmsModel = cmsModel;
        this.cmsService = cmsService;
    }
    async createCms(data) {
        const newCms = await this.cmsService.insertCms(data.name, data.description);
        return {
            successCode: 201,
            successMessage: 'cms create sucess',
            list: newCms,
        };
    }
    async updateCms(data) {
        const result = await this.cmsService.updateCms(data.id, data.name, data.description, data.status);
        return {
            successCode: 200,
            successMessage: 'cms update',
            list: result,
        };
    }
    async getCmsById(id) {
        const result = await this.cmsService.getCmsById(id);
        return {
            successCode: 200,
            successMessage: 'cms details',
            list: result,
        };
    }
    async getAllCms() {
        const pagination = { page: 1, size: 10, searchKey: '' };
        const result = await this.cmsService.getAllCms(pagination.page, pagination.size, pagination.searchKey);
        return {
            successCode: 200,
            successMessage: 'cms list',
            list: result,
        };
    }
};
__decorate([
    (0, common_1.Post)('createCms'),
    (0, swagger_1.ApiOperation)({ summary: 'create cms page from this api' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    example: 'any',
                    description: 'this is cms page name*',
                },
                description: {
                    type: 'string',
                    example: 'any',
                    description: 'this is cms page description*',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'cms create',
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'All field are required',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "createCms", null);
__decorate([
    (0, common_1.Put)('updateCms'),
    (0, swagger_1.ApiOperation)({ summary: 'update cms page from this api' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                id: {
                    type: 'string',
                    example: 'any',
                    description: 'this is cms page id*',
                },
                name: {
                    type: 'string',
                    example: 'any',
                    description: 'this is cms page name*',
                },
                description: {
                    type: 'string',
                    example: 'any',
                    description: 'this is cms page description*',
                },
                status: {
                    type: 'boolean',
                    example: true,
                    description: 'this is cms page status*',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'cms update',
    }),
    (0, swagger_1.ApiResponse)({
        status: 204,
        description: 'id field are required',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "updateCms", null);
__decorate([
    (0, common_1.Get)('findOne/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'get cms page by id from this api' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        example: 'any',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'cms detals',
    }),
    (0, swagger_1.ApiResponse)({
        status: 204,
        description: 'id is required',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "getCmsById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'get all cms list from this api' }),
    (0, swagger_1.ApiSecurity)('bearer'),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'get all cms ',
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Something went wrong',
    }),
    (0, common_1.Get)('findAll/cms'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CmsController.prototype, "getAllCms", null);
CmsController = __decorate([
    (0, swagger_1.ApiTags)('cms'),
    (0, swagger_1.ApiSecurity)('bearer'),
    (0, common_1.UseFilters)(new http_exception_filter_1.HttpExceptionFilter()),
    (0, common_1.UseInterceptors)(new logging_interceptor_1.LoggingInterceptor()),
    (0, common_1.Controller)('cms'),
    __param(0, (0, mongoose_1.InjectModel)('cms')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        cms_service_1.CmsService])
], CmsController);
exports.CmsController = CmsController;
//# sourceMappingURL=cms.controller.js.map