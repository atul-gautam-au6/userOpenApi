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
exports.MedicineController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const medicines_service_1 = require("../services/medicines.service");
let MedicineController = class MedicineController {
    constructor(MedicineService) {
        this.MedicineService = MedicineService;
    }
    async createMedicine(data) {
        console.log(data.MedicineName, 'medical condtion Name');
        if (!data.MedicineName) {
            return {
                errorCode: 403,
                message: 'Medicine Name is Mandatory',
            };
        }
        if (!data.Manufacturer) {
            return {
                errorCode: 403,
                message: 'Manufacturer Name is Mandatory',
            };
        }
        if (!data.Salt) {
            return {
                errorCode: 403,
                message: 'Salt Name is Mandatory',
            };
        }
        const newMedicine = await this.MedicineService.insertMedicine(data.MedicineName, data.Manufacturer, data.Salt, data.status);
        console.log(newMedicine, 'new Medical condito ');
        return {
            successCode: 201,
            message: 'Medicine Created Scucessfully',
            list: newMedicine,
        };
    }
    async getAllMedicines(pageSize, newPage) {
        const pageOptions = {
            page: newPage || 1,
            size: pageSize || 10,
        };
        const medicineList = await this.MedicineService.getAllMedicines(pageOptions.page, pageOptions.size);
        if (!medicineList) {
            return {
                successCode: 400,
                message: 'No Medicines Found',
            };
        }
        return {
            successCode: 200,
            data: medicineList,
        };
    }
    async updateMedicine(data) {
        const updatedMedicine = await this.MedicineService.updateMedicine(data.id, data.MedicineName, data.Manufacturer, data.Salt, data.status);
        return {
            successCode: 200,
            message: 'Medicine updated',
            data: updatedMedicine,
        };
    }
    async getMedicineById(Id) {
        const getMedicine = await this.MedicineService.getMedicineByid(Id);
        return {
            successCode: 200,
            successMessage: 'Medicine  details',
            list: getMedicine,
        };
    }
};
__decorate([
    (0, common_1.Post)('createMedicine'),
    (0, swagger_1.ApiOperation)({ summary: 'create Medicine in this Api' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                MedicineName: {
                    type: 'string',
                    example: 'Paracetemol',
                    description: 'this is the Medicine name',
                },
                Manufacturer: {
                    type: 'string',
                    example: 'Farmson',
                    description: 'Enter the manufacturer name of the medicine',
                },
                Salt: {
                    type: 'string',
                    example: 'enter the salt name here',
                    description: '',
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
        description: 'Medicine Added',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Fields are  Mandatory',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MedicineController.prototype, "createMedicine", null);
__decorate([
    (0, common_1.Get)('getMedicines/getAll'),
    __param(0, (0, common_1.Query)('pageSize')),
    __param(1, (0, common_1.Query)('newPage')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], MedicineController.prototype, "getAllMedicines", null);
__decorate([
    (0, common_1.Patch)('updateMedicine'),
    (0, swagger_1.ApiOperation)({ summary: 'update Medicine from this api' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                id: {
                    type: 'string',
                },
                MedicineName: {
                    type: 'string',
                    example: 'Paracetemol',
                    description: 'this is the Medicine name',
                },
                Manufacturer: {
                    type: 'string',
                    example: 'Farmson',
                    description: 'Enter the manufacturer name of the medicine',
                },
                Salt: {
                    type: 'string',
                    example: 'enter the salt name here',
                    description: '',
                },
                status: {
                    type: 'boolean',
                    example: 'true/false',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Medicine Updated',
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'id field is required',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MedicineController.prototype, "updateMedicine", null);
__decorate([
    (0, common_1.Get)('medicine/:Id'),
    (0, swagger_1.ApiOperation)({ summary: 'get medicine by id from this api' }),
    (0, swagger_1.ApiParam)({
        name: 'Id',
        example: 'any',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Medicine details',
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'id field are required',
    }),
    __param(0, (0, common_1.Param)('Id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MedicineController.prototype, "getMedicineById", null);
MedicineController = __decorate([
    (0, swagger_1.ApiTags)('master-setting'),
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [medicines_service_1.MedicinesService])
], MedicineController);
exports.MedicineController = MedicineController;
//# sourceMappingURL=medicines.controller.js.map