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
exports.LogoController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const mongoose_2 = require("mongoose");
const http_exception_filter_1 = require("../../auth/exceptions/http.exception.filter");
const logging_interceptor_1 = require("../../auth/exceptions/logging.interceptor");
const logo_service_1 = require("../services/logo.service");
let LogoController = class LogoController {
    constructor(logoModel, logoService) {
        this.logoModel = logoModel;
        this.logoService = logoService;
    }
    async createLogo(file, data) {
        if (!(file === null || file === void 0 ? void 0 : file.filename)) {
            return {
                errorCode: 500,
                errorMessage: "logo is required*",
            };
        }
        const newLogo = await this.logoService.insertLogo(file === null || file === void 0 ? void 0 : file.filename, data.status);
        return {
            successCode: 201,
            successMessage: "logo create success",
            list: newLogo,
        };
    }
    async updateLogo(file, data) {
        if (!data.id) {
            return {
                errorCode: 500,
                errorMessage: "logo id is required for update*",
            };
        }
        const updateLogo = await this.logoService.updateLogo(data.id, file === null || file === void 0 ? void 0 : file.filename, data.status);
        return {
            successCode: 200,
            successMessage: "logo update success",
            list: updateLogo,
        };
    }
    async getLogoById(logoId) {
        if (!logoId) {
            return {
                errorCode: 500,
                errorMessage: "logo id is required*",
            };
        }
        const getLogo = await this.logoService.getLogoById(logoId);
        return {
            successCode: 200,
            successMessage: "logo details",
            list: getLogo,
        };
    }
    async getAllLogo() {
        const pagination = { page: 1, size: 10, searchKey: "" };
        const getLogo = await this.logoService.getAllLogo(pagination.page, pagination.size, pagination.searchKey);
        return {
            successCode: 200,
            successMessage: "all logo",
            list: getLogo,
        };
    }
};
__decorate([
    (0, common_1.Post)("createLogo"),
    (0, swagger_1.ApiOperation)({ summary: "create logo from this api" }),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object",
            properties: {
                logo: {
                    type: "string",
                    format: "binary",
                    description: "this is logo image url *",
                },
                status: {
                    type: "boolean",
                    example: true,
                    description: "this is logo status *",
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "logo create",
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: "Internal server error",
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("logo", {
        dest: "client/logo/",
        limits: {
            fieldSize: 10 * 1024 * 1024,
        },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LogoController.prototype, "createLogo", null);
__decorate([
    (0, common_1.Put)("/updateLogo"),
    (0, swagger_1.ApiOperation)({ summary: "update logo from this api" }),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object",
            properties: {
                id: {
                    type: "string",
                    example: "any",
                    description: "this is logo id*",
                },
                logo: {
                    type: "string",
                    format: "binary",
                    description: "this is logo image url *",
                },
                status: {
                    type: "boolean",
                    example: true,
                    description: "this is logo status *",
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "logo update",
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: "Internal server error",
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("logo", {
        dest: "client/logo/",
        limits: {
            fieldSize: 10 * 1024 * 1024,
        },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LogoController.prototype, "updateLogo", null);
__decorate([
    (0, common_1.Get)("/getById/:logoId"),
    (0, swagger_1.ApiOperation)({ summary: "get logo by id from this api" }),
    (0, swagger_1.ApiParam)({
        name: "logoId",
        example: "any",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "logo details",
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: "id field are required",
    }),
    __param(0, (0, common_1.Param)("logoId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LogoController.prototype, "getLogoById", null);
__decorate([
    (0, common_1.Get)("logos"),
    (0, swagger_1.ApiOperation)({ summary: "get all logo from this api" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "logo list",
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: "server error",
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LogoController.prototype, "getAllLogo", null);
LogoController = __decorate([
    (0, swagger_1.ApiTags)("master-setting"),
    (0, swagger_1.ApiSecurity)("bearer"),
    (0, common_1.UseFilters)(new http_exception_filter_1.HttpExceptionFilter()),
    (0, common_1.UseInterceptors)(new logging_interceptor_1.LoggingInterceptor()),
    (0, common_1.Controller)("logo"),
    __param(0, (0, mongoose_1.InjectModel)("logo")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        logo_service_1.LogoService])
], LogoController);
exports.LogoController = LogoController;
//# sourceMappingURL=logo.controller.js.map