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
exports.RelationController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
const mongoose_2 = require("mongoose");
const http_exception_filter_1 = require("../../auth/exceptions/http.exception.filter");
const logging_interceptor_1 = require("../../auth/exceptions/logging.interceptor");
const relation_service_1 = require("../services/relation.service");
let RelationController = class RelationController {
    constructor(relationModel, relationService) {
        this.relationModel = relationModel;
        this.relationService = relationService;
    }
    async createRelation(data) {
        const newrelation = await this.relationService.insertRelation(data.relationship, data.type);
        return {
            successCode: 201,
            successMessage: "relaton create success",
            list: newrelation,
        };
    }
    async updateRelation(data) {
        const updaterelation = await this.relationService.updateRelation(data.id, data.relationship, data.type, data.status);
        return {
            successCode: 200,
            successMessage: "relaton update success",
            list: updaterelation,
        };
    }
    async getRelationById(id) {
        const getrelation = await this.relationService.getRelationById(id);
        return {
            successCode: 200,
            successMessage: "get relation",
            list: getrelation,
        };
    }
    async getAllRelation(pageSize, newPage) {
        const pagination = {
            page: newPage || 1,
            size: pageSize || 10,
            searchKey: "",
        };
        const result = await this.relationService.getAllRelation(pagination.page, pagination.size, pagination.searchKey);
        return {
            successCode: 200,
            successMessage: "get relation list",
            list: result,
        };
    }
};
__decorate([
    (0, common_1.Post)("createRelation"),
    (0, swagger_1.ApiOperation)({ summary: "create relation from this api" }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object",
            properties: {
                relationship: {
                    type: "string",
                    example: "any",
                    description: "this is relationship name*",
                },
                type: {
                    type: "string",
                    enum: ["Family", "Professional", "Locality"],
                    description: "this is type of relation*",
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "relation create",
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: "All field are required",
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RelationController.prototype, "createRelation", null);
__decorate([
    (0, common_1.Put)("updateRelation"),
    (0, swagger_1.ApiOperation)({ summary: "create relation from this api" }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object",
            properties: {
                id: {
                    type: "string",
                    example: "any",
                    description: "this is your relation id",
                },
                relationship: {
                    type: "string",
                    example: "any",
                    description: "this is relationship name*",
                },
                type: {
                    type: "string",
                    enum: ["Family", "Professional", "Locality"],
                    description: "this is type of relation*",
                },
                status: {
                    type: "boolean",
                    example: true,
                    description: "this is status of relation*",
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "relation update",
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: "id field is required",
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RelationController.prototype, "updateRelation", null);
__decorate([
    (0, common_1.Get)("findById/:id"),
    (0, swagger_1.ApiOperation)({ summary: "get relation by id from this api" }),
    (0, swagger_1.ApiParam)({
        name: "id",
        example: "any",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "relation details",
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: "id field arpage: number, size: number, searchKey: stringe required",
    }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RelationController.prototype, "getRelationById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "get all relation from this api" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "relation list",
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: "server error",
    }),
    (0, common_1.Get)("findAll/relation"),
    __param(0, (0, common_1.Query)("pageSize")),
    __param(1, (0, common_1.Query)("newPage")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], RelationController.prototype, "getAllRelation", null);
RelationController = __decorate([
    (0, swagger_1.ApiTags)("master-setting"),
    (0, swagger_1.ApiSecurity)("bearer"),
    (0, common_1.UseFilters)(new http_exception_filter_1.HttpExceptionFilter()),
    (0, common_1.UseInterceptors)(new logging_interceptor_1.LoggingInterceptor()),
    (0, common_1.Controller)("masterSetting"),
    __param(0, (0, mongoose_1.InjectModel)("relation")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        relation_service_1.RelationService])
], RelationController);
exports.RelationController = RelationController;
//# sourceMappingURL=relationMapping.controller.js.map