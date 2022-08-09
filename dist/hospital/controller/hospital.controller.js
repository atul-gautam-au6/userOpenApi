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
exports.HospitalController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
const mongoose_2 = require("mongoose");
const http_exception_filter_1 = require("../../auth/exceptions/http.exception.filter");
const logging_interceptor_1 = require("../../auth/exceptions/logging.interceptor");
const jwt_auth_guard_1 = require("../../auth/guard/jwt-auth.guard");
const hospital_service_1 = require("../services/hospital.service");
let HospitalController = class HospitalController {
    constructor(hospitalModel, hospitalService) {
        this.hospitalModel = hospitalModel;
        this.hospitalService = hospitalService;
    }
    async createHospital(res, data) {
        if (!data.name ||
            !data.email ||
            !data.phone ||
            !data.bannerImage ||
            !data.image ||
            !data.description) {
            res.status(403).json({
                errorCode: 403,
                errorMessage: 'All field are required',
            });
        }
        const result = await this.hospitalService.insertHospital(data.name, data.email, data.phone, data.location, data.point, data.bannerImage, data.image, data.description);
        return {
            successCode: 201,
            successMessage: 'hospita create sucess',
            list: result,
        };
    }
    async updateeHospital(res, data) {
        if (!data.id) {
            res.status(403).json({
                errorCode: 403,
                errorMessage: 'Id is required',
            });
        }
        const result = await this.hospitalService.updateHospital(data.id, data.name, data.email, data.phone, data.location, data.point, data.bannerImage, data.image, data.description, data.status);
        return {
            successCode: 200,
            successMessage: 'hospita update sucess',
            list: result,
        };
    }
    async getHospitalById(res, id) {
        if (!id) {
            return res.status(403).json({
                errorCode: 403,
                errorMessgae: 'id is required',
            });
        }
        const result = await this.hospitalService.getHospitalById(id);
        return {
            successCode: 200,
            successMessage: 'get hospital details',
            list: result,
        };
    }
    async allHospitals() {
        const pagination = { page: 1, size: 10, searchKey: '' };
        const result = await this.hospitalService.getHospitalList(pagination.page, pagination.size, pagination.searchKey);
        return {
            successCod: 200,
            successMessage: 'all hospital list',
            list: result,
        };
    }
};
__decorate([
    (0, common_1.Post)('createHospital'),
    __param(0, (0, common_1.Response)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], HospitalController.prototype, "createHospital", null);
__decorate([
    (0, common_1.Put)('updateHospital'),
    __param(0, (0, common_1.Response)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], HospitalController.prototype, "updateeHospital", null);
__decorate([
    (0, common_1.Get)('findById/:id'),
    __param(0, (0, common_1.Response)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], HospitalController.prototype, "getHospitalById", null);
__decorate([
    (0, common_1.Get)('allHospital'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HospitalController.prototype, "allHospitals", null);
HospitalController = __decorate([
    (0, swagger_1.ApiTags)('hospital'),
    (0, common_1.Controller)('admin/hospital'),
    (0, swagger_1.ApiSecurity)('bearer'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseFilters)(new http_exception_filter_1.HttpExceptionFilter()),
    (0, common_1.UseInterceptors)(new logging_interceptor_1.LoggingInterceptor()),
    __param(0, (0, mongoose_1.InjectModel)('hospital')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        hospital_service_1.HospitalService])
], HospitalController);
exports.HospitalController = HospitalController;
//# sourceMappingURL=hospital.controller.js.map