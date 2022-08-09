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
exports.CriticalHistoryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const criticahistory_service_1 = require("../services/criticahistory.service");
let CriticalHistoryController = class CriticalHistoryController {
    constructor(criticalHsitoryService) {
        this.criticalHsitoryService = criticalHsitoryService;
    }
    async createCriticalHistory(data) {
        console.log(data.CriticalHistory, 'medical condtion Name');
        if (!data.CriticalHistory) {
            return {
                errorCode: 403,
                message: 'Critical history is Mandatory',
            };
        }
        const newCriticalHistory = await this.criticalHsitoryService.insertCriticalHistory(data.CriticalHistory, data.status);
        console.log(newCriticalHistory, 'new Medical condito ');
        return {
            successCode: 201,
            message: 'Critical history Created Scucessfully',
            list: newCriticalHistory,
        };
    }
    async getAllCriticalHistory(pageSize, newPage) {
        const pageOptions = {
            page: newPage || 1,
            size: pageSize || 10,
        };
        const criticalHistoryList = await this.criticalHsitoryService.getAllCriticalHistory(pageOptions.page, pageOptions.size);
        if (!criticalHistoryList) {
            return {
                successCode: 400,
                message: 'No Medical Condtions Found',
            };
        }
        return {
            successCode: 200,
            data: criticalHistoryList,
        };
    }
    async updateCriticalHistory(data) {
        const updatedCriticalHistory = await this.criticalHsitoryService.updateCriticalHistory(data.id, data.CriticalHistory, data.status);
        return {
            successCode: 200,
            message: 'Medical History updated',
            data: updatedCriticalHistory,
        };
    }
    async getCriticalHistoryById(Id) {
        const getCriticalHistory = await this.criticalHsitoryService.getCriticalHistoryByid(Id);
        return {
            successCode: 200,
            successMessage: 'Critical history  detail',
            list: getCriticalHistory,
        };
    }
};
__decorate([
    (0, common_1.Post)('createCriticalHistory'),
    (0, swagger_1.ApiOperation)({ summary: 'create medical Condition in this Api' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                CriticalHistory: {
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
        description: 'Criitcal History Added',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Critical history is Mandatory',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CriticalHistoryController.prototype, "createCriticalHistory", null);
__decorate([
    (0, common_1.Get)('getCriticalHistory/getAll'),
    __param(0, (0, common_1.Query)('pageSize')),
    __param(1, (0, common_1.Query)('newPage')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], CriticalHistoryController.prototype, "getAllCriticalHistory", null);
__decorate([
    (0, common_1.Patch)('updateCriticalHistory'),
    (0, swagger_1.ApiOperation)({ summary: 'update Critcal History from this api' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                id: {
                    type: 'string',
                },
                CriticalHistory: {
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
        description: 'Critical History Updated',
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'id field is required',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CriticalHistoryController.prototype, "updateCriticalHistory", null);
__decorate([
    (0, common_1.Get)('criticalHistory/:Id'),
    (0, swagger_1.ApiOperation)({ summary: 'get Critical history by id from this api' }),
    (0, swagger_1.ApiParam)({
        name: 'Id',
        example: 'any',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'critical history details',
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'id field are required',
    }),
    __param(0, (0, common_1.Param)('Id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CriticalHistoryController.prototype, "getCriticalHistoryById", null);
CriticalHistoryController = __decorate([
    (0, swagger_1.ApiTags)('master-setting'),
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [criticahistory_service_1.CriticalHistorySevice])
], CriticalHistoryController);
exports.CriticalHistoryController = CriticalHistoryController;
//# sourceMappingURL=criticalhistory.controller.js.map