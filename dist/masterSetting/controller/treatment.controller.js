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
exports.TreatmentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const treatment_service_1 = require("../services/treatment.service");
let TreatmentController = class TreatmentController {
    constructor(TreatmentService) {
        this.TreatmentService = TreatmentService;
    }
    async createTreatment(data) {
        console.log(data.TreatmentName, "medical condtion Name");
        if (!data.TreatmentName) {
            return {
                errorCode: 403,
                message: "Treatment Name is Mandatory",
            };
        }
        const newTreatment = await this.TreatmentService.insertTreatment(data.TreatmentName, data.status);
        console.log(newTreatment, "new Medical condito ");
        return {
            successCode: 201,
            message: "Treatment Created Scucessfully",
            list: newTreatment,
        };
    }
    async getAllTreatments(pageSize, newPage) {
        const pageOptions = {
            page: newPage || 1,
            size: pageSize || 10,
        };
        const treatmentList = await this.TreatmentService.getAllTreatments(pageOptions.page, pageOptions.size);
        if (!treatmentList) {
            return {
                successCode: 400,
                message: "No Treatments Found",
            };
        }
        return {
            successCode: 200,
            data: treatmentList,
        };
    }
    async updateTreatment(data) {
        const updatedTreatment = await this.TreatmentService.updateTreatment(data.id, data.TreatmentName, data.status);
        return {
            successCode: 200,
            message: "Treatment updated",
            data: updatedTreatment,
        };
    }
    async getTreatmentById(Id) {
        const getTreatment = await this.TreatmentService.getTreatmentByid(Id);
        return {
            successCode: 200,
            successMessage: "Treatment  details",
            list: getTreatment,
        };
    }
};
__decorate([
    (0, common_1.Post)("createTreatment"),
    (0, swagger_1.ApiOperation)({ summary: "create Treatment in this Api" }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object",
            properties: {
                TreatmentName: {
                    type: "string",
                    example: "go for tests",
                    description: "this is the Treatment name",
                },
                status: {
                    type: "boolean",
                    example: "true/false",
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 202,
        description: "Treatment Added",
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: "Treatment Name is Mandatory",
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TreatmentController.prototype, "createTreatment", null);
__decorate([
    (0, common_1.Get)("getTreatments/getAll"),
    __param(0, (0, common_1.Query)("pageSize")),
    __param(1, (0, common_1.Query)("newPage")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], TreatmentController.prototype, "getAllTreatments", null);
__decorate([
    (0, common_1.Patch)("updateTreatment"),
    (0, swagger_1.ApiOperation)({ summary: "update Treatment from this api" }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object",
            properties: {
                id: {
                    type: "string",
                },
                TreatmentName: {
                    type: "string",
                    example: "better",
                    description: "enter Treatment Name",
                },
                status: {
                    type: "boolean",
                    example: "false",
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Treatment Updated",
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: "id field is required",
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TreatmentController.prototype, "updateTreatment", null);
__decorate([
    (0, common_1.Get)("treatment/:Id"),
    (0, swagger_1.ApiOperation)({ summary: "get treatment by id from this api" }),
    (0, swagger_1.ApiParam)({
        name: "Id",
        example: "any",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "treatmetn details",
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: "id field are required",
    }),
    __param(0, (0, common_1.Param)("Id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TreatmentController.prototype, "getTreatmentById", null);
TreatmentController = __decorate([
    (0, swagger_1.ApiTags)("master-setting"),
    (0, common_1.Controller)("admin"),
    __metadata("design:paramtypes", [treatment_service_1.TreatmentService])
], TreatmentController);
exports.TreatmentController = TreatmentController;
//# sourceMappingURL=treatment.controller.js.map