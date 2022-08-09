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
exports.CriticalMedicalConditionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const criticalmedicalcondition_service_1 = require("../services/criticalmedicalcondition.service");
let CriticalMedicalConditionController = class CriticalMedicalConditionController {
    constructor(criticalMedicalConditonService) {
        this.criticalMedicalConditonService = criticalMedicalConditonService;
    }
    async createMedicalCondition(data) {
        console.log(data.MedicalConditionName, 'medical condtion Name');
        if (!data.MedicalConditionName) {
            return {
                errorCode: 403,
                message: 'Please Enter Medical Condtion',
            };
        }
        const newMedicalcondition = await this.criticalMedicalConditonService.insertCriticalMedicalCondition(data.MedicalConditionName, data.status);
        console.log(newMedicalcondition, 'new Medical condito ');
        return {
            successCode: 201,
            message: 'Medical condition Created Scucessfully',
            list: newMedicalcondition,
        };
    }
    async getAllCriticalMedicalCondition(pageSize, newPage) {
        const pageOptions = {
            page: newPage || 1,
            size: pageSize || 10,
        };
        const criticalMedicalConditionList = await this.criticalMedicalConditonService.getAllCriticalMedicalCondition(pageOptions.page, pageOptions.size);
        if (!criticalMedicalConditionList) {
            return {
                successCode: 400,
                message: 'No Medical Condtions Found',
            };
        }
        return {
            successCode: 200,
            data: criticalMedicalConditionList,
        };
    }
    async updateCriticalMedicalCondition(data) {
        const updatedCriticalMedicalcondtion = await this.criticalMedicalConditonService.updateMedicalCondition(data.id, data.MedicalConditionName, data.status);
        return {
            successCode: 200,
            message: 'Medical condition updated',
            data: updatedCriticalMedicalcondtion,
        };
    }
    async getCriticalMedicalconditionById(Id) {
        const getCriticalMedicalCondition = await this.criticalMedicalConditonService.getCriticalMedicalConditionByid(Id);
        return {
            successCode: 200,
            successMessage: 'Critical history  detail',
            list: getCriticalMedicalCondition,
        };
    }
};
__decorate([
    (0, common_1.Post)('createCriticalMedicalCondition'),
    (0, swagger_1.ApiOperation)({ summary: 'create medical Condition in this Api' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                MedicalConditionName: {
                    type: 'string',
                    example: 'fever',
                    description: 'this is the medical condtion',
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
        description: 'Medical Condition Added',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Medical condtion Name is required',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CriticalMedicalConditionController.prototype, "createMedicalCondition", null);
__decorate([
    (0, common_1.Get)('getCriticalMedicalCondition/getAll'),
    __param(0, (0, common_1.Query)('pageSize')),
    __param(1, (0, common_1.Query)('newPage')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], CriticalMedicalConditionController.prototype, "getAllCriticalMedicalCondition", null);
__decorate([
    (0, common_1.Patch)('updateCriticalMedicalCondition'),
    (0, swagger_1.ApiOperation)({ summary: 'update Critcal Medical Condition from this api' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                id: {
                    type: 'string',
                },
                MedicalConditionName: {
                    type: 'string',
                    example: 'fever/any',
                    description: 'enter medical condition Name',
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
        description: 'Medical Critical condition Update',
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'id field is required',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CriticalMedicalConditionController.prototype, "updateCriticalMedicalCondition", null);
__decorate([
    (0, common_1.Get)('criticalMedicalcondition/:Id'),
    (0, swagger_1.ApiOperation)({
        summary: 'get critical medical condiiton by id from this api',
    }),
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
], CriticalMedicalConditionController.prototype, "getCriticalMedicalconditionById", null);
CriticalMedicalConditionController = __decorate([
    (0, swagger_1.ApiTags)('master-setting'),
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [criticalmedicalcondition_service_1.criticalmedicalconditionSevice])
], CriticalMedicalConditionController);
exports.CriticalMedicalConditionController = CriticalMedicalConditionController;
//# sourceMappingURL=criticalmedicalcondition.controller.js.map