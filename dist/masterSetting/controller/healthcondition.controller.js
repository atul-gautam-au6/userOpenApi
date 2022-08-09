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
exports.HealthConditionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const healthcondition_service_1 = require("../services/healthcondition.service");
let HealthConditionController = class HealthConditionController {
    constructor(healthConditionService) {
        this.healthConditionService = healthConditionService;
    }
    async createHealthCondition(data) {
        console.log(data.HealthCondition, 'medical condtion Name');
        if (!data.HealthCondition) {
            return {
                errorCode: 403,
                message: 'Health condition is Mandatory',
            };
        }
        const newHealthCondition = await this.healthConditionService.insertHealthCondition(data.HealthCondition, data.status);
        console.log(newHealthCondition, 'new Medical condito ');
        return {
            successCode: 201,
            message: 'Health Created Scucessfully',
            list: newHealthCondition,
        };
    }
    async getAllHealthCondition(pageSize, newPage) {
        const pageOptions = {
            page: newPage || 1,
            size: pageSize || 10,
        };
        const healthConditionList = await this.healthConditionService.getAllHealthCondition(pageOptions.page, pageOptions.size);
        if (!healthConditionList) {
            return {
                successCode: 400,
                message: 'No Health Condtions Found',
            };
        }
        return {
            successCode: 200,
            data: healthConditionList,
        };
    }
    async updateCriticalHistory(data) {
        const updatedHealthcondition = await this.healthConditionService.updateCriticalHistory(data.id, data.HealthCondition, data.status);
        return {
            successCode: 200,
            message: 'Health Condition updated',
            data: updatedHealthcondition,
        };
    }
    async getHealthconditionById(Id) {
        const getHealthCondition = await this.healthConditionService.getHealthConditionByid(Id);
        return {
            successCode: 200,
            successMessage: 'Health conditon retrieved',
            list: getHealthCondition,
        };
    }
};
__decorate([
    (0, common_1.Post)('createhealthCondition'),
    (0, swagger_1.ApiOperation)({ summary: 'create medical Condition in this Api' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                HealthCondition: {
                    type: 'string',
                    example: 'fever',
                    description: 'this is the Critical history',
                },
                status: {
                    type: 'boolean',
                    example: 'true/false',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 202,
        description: 'Health condition Added',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Health Condition is Mandatory',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HealthConditionController.prototype, "createHealthCondition", null);
__decorate([
    (0, common_1.Get)('getHealthCondition/getAll'),
    __param(0, (0, common_1.Query)('pageSize')),
    __param(1, (0, common_1.Query)('newPage')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], HealthConditionController.prototype, "getAllHealthCondition", null);
__decorate([
    (0, common_1.Patch)('updateHealthCondition'),
    (0, swagger_1.ApiOperation)({ summary: 'update Health from this api' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                id: {
                    type: 'string',
                },
                HealthCondition: {
                    type: 'string',
                    example: 'better',
                    description: 'enter health condition',
                },
                status: {
                    type: 'boolean',
                    example: 'false',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Health condition Updated',
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'id field is required',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HealthConditionController.prototype, "updateCriticalHistory", null);
__decorate([
    (0, common_1.Get)('healthcondition/:Id'),
    (0, swagger_1.ApiOperation)({ summary: 'get health condition by id from this api' }),
    (0, swagger_1.ApiParam)({
        name: 'Id',
        example: 'any',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'critical Medical condition details',
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'id field are required',
    }),
    __param(0, (0, common_1.Param)('Id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HealthConditionController.prototype, "getHealthconditionById", null);
HealthConditionController = __decorate([
    (0, swagger_1.ApiTags)('master-setting'),
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [healthcondition_service_1.HealthConditionService])
], HealthConditionController);
exports.HealthConditionController = HealthConditionController;
//# sourceMappingURL=healthcondition.controller.js.map