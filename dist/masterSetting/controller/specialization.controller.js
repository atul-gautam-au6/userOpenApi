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
exports.SpecializationController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
const mongoose_2 = require("mongoose");
const specialization_service_1 = require("../services/specialization.service");
const http_exception_filter_1 = require("../../auth/exceptions/http.exception.filter");
const logging_interceptor_1 = require("../../auth/exceptions/logging.interceptor");
let SpecializationController = class SpecializationController {
    constructor(specializationModel, SpecializationService) {
        this.specializationModel = specializationModel;
        this.SpecializationService = SpecializationService;
    }
    async createSpecialization(data) {
        if (!data.name || !data.status) {
            return {
                errorCode: 403,
                errorMessage: "Name and status fields are required*",
            };
        }
        const newSpecialization = await this.SpecializationService.insertSpecialization(data.name, data.status);
        return {
            successCode: 201,
            successMessage: "specialization create success",
            list: newSpecialization,
        };
    }
    async updateSpecialization(data) {
        const getSpecialization = await this.SpecializationService.updateSpecialization(data.id, data.name, data.status);
        return {
            successCode: 200,
            successMessage: "specialization update success",
            list: getSpecialization,
        };
    }
    async getCategoryById(specializationId) {
        const getSpecialization = await this.SpecializationService.getSpecializationByid(specializationId);
        return {
            successCode: 200,
            successMessage: "specialization details ",
            list: getSpecialization,
        };
    }
    async getAllspecialization(pageSize, newPage) {
        const pagination = {
            page: newPage || 1,
            size: pageSize || 10,
            searchKey: "",
        };
        const result = await this.SpecializationService.getAllSpecialization(pagination.page, pagination.size, pagination.searchKey);
        return {
            successCod: 200,
            successMessage: "all specialization list",
            list: result,
        };
    }
};
__decorate([
    (0, common_1.Post)("createSpecialization"),
    (0, swagger_1.ApiOperation)({ summary: "create specialization  from this api" }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object",
            properties: {
                name: {
                    type: "string",
                    example: "any",
                    description: "this is specialization name*",
                },
                status: {
                    type: "booelan",
                    example: true,
                    description: "this is status of specialization*",
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "specialization create",
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: "All field are required",
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SpecializationController.prototype, "createSpecialization", null);
__decorate([
    (0, common_1.Put)("updateSpecilalization"),
    (0, swagger_1.ApiOperation)({ summary: "update specialization from this api" }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object",
            properties: {
                id: {
                    type: "string",
                    example: "any",
                    description: "this is your specialization",
                },
                name: {
                    type: "string",
                    example: "any",
                    description: "this is specialization name*",
                },
                status: {
                    type: "boolean",
                    example: true,
                    description: "this is status of specialization*",
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "specialization update",
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: "id field is required",
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SpecializationController.prototype, "updateSpecialization", null);
__decorate([
    (0, common_1.Get)("specialization/findone/:specializationId"),
    (0, swagger_1.ApiOperation)({ summary: "get specialization by id from this api" }),
    (0, swagger_1.ApiParam)({
        name: "specializationId",
        example: "any",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "specialization details",
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: "id field are required",
    }),
    __param(0, (0, common_1.Param)("specializationId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SpecializationController.prototype, "getCategoryById", null);
__decorate([
    (0, common_1.Get)("specialization/getAll"),
    __param(0, (0, common_1.Query)("pageSize")),
    __param(1, (0, common_1.Query)("newPage")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], SpecializationController.prototype, "getAllspecialization", null);
SpecializationController = __decorate([
    (0, swagger_1.ApiTags)("master-setting"),
    (0, swagger_1.ApiSecurity)("bearer"),
    (0, common_1.UseFilters)(new http_exception_filter_1.HttpExceptionFilter()),
    (0, common_1.UseInterceptors)(new logging_interceptor_1.LoggingInterceptor()),
    (0, common_1.Controller)("admin"),
    __param(0, (0, mongoose_1.InjectModel)("specialization")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        specialization_service_1.SpecializationService])
], SpecializationController);
exports.SpecializationController = SpecializationController;
//# sourceMappingURL=specialization.controller.js.map