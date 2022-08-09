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
exports.LocationController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
const mongoose_2 = require("mongoose");
const http_exception_filter_1 = require("../../auth/exceptions/http.exception.filter");
const logging_interceptor_1 = require("../../auth/exceptions/logging.interceptor");
const location_service_1 = require("../services/location.service");
let LocationController = class LocationController {
    constructor(locationModel, locationService) {
        this.locationModel = locationModel;
        this.locationService = locationService;
    }
    async createLocation(data) {
        const newLocation = await this.locationService.insertLocation(data.state, data.city, data.pinCode);
        return {
            successCode: 201,
            successMessage: 'locaton create success',
            list: newLocation,
        };
    }
    async updateLocation(data) {
        const updateLocation = await this.locationService.updateLocation(data.id, data.state, data.city, data.pinCode, data.status);
        return {
            successCode: 200,
            successMessage: 'locaton update success',
            list: updateLocation,
        };
    }
    async getLocationById(id) {
        const getLocation = await this.locationService.getLocationById(id);
        return {
            successCode: 200,
            successMessage: 'get location',
            list: getLocation,
        };
    }
    async getAllLocation(pageSize, newPage) {
        const pagination = {
            page: newPage || 1,
            size: pageSize || 10,
            searchKey: '',
        };
        const result = await this.locationService.getAllLocation(pagination.page, pagination.size, pagination.searchKey);
        return {
            successCod: 200,
            successMessage: 'all categories list',
            list: result,
        };
    }
};
__decorate([
    (0, common_1.Post)('createLocation'),
    (0, swagger_1.ApiOperation)({ summary: 'create location from this api' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                state: {
                    type: 'string',
                    example: 'any',
                    description: 'this is state name*',
                },
                city: {
                    type: 'string',
                    example: 'any',
                    description: 'this is city name*',
                },
                pinCode: {
                    type: 'number',
                    example: true,
                    description: 'this is pin code*',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'location create',
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'All field are required',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "createLocation", null);
__decorate([
    (0, common_1.Put)('updateLocation'),
    (0, swagger_1.ApiOperation)({ summary: 'update location from this api' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                id: {
                    type: 'string',
                    example: 'any',
                    description: 'this is your location id',
                },
                state: {
                    type: 'string',
                    example: 'any',
                    description: 'this is state name*',
                },
                city: {
                    type: 'string',
                    example: 'any',
                    description: 'this is city name*',
                },
                pinCode: {
                    type: 'number',
                    example: true,
                    description: 'this is pin code*',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'location create',
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'All field are required',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "updateLocation", null);
__decorate([
    (0, common_1.Get)('getLocation/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'get location by id from this api' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        example: 'any',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'location details',
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'id field are required',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "getLocationById", null);
__decorate([
    (0, common_1.Get)('getAllLocation'),
    (0, swagger_1.ApiOperation)({ summary: 'get All location  from this api' }),
    __param(0, (0, common_1.Query)('pageSize')),
    __param(1, (0, common_1.Query)('newPage')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "getAllLocation", null);
LocationController = __decorate([
    (0, swagger_1.ApiTags)('master-setting'),
    (0, swagger_1.ApiSecurity)('bearer'),
    (0, common_1.UseFilters)(new http_exception_filter_1.HttpExceptionFilter()),
    (0, common_1.UseInterceptors)(new logging_interceptor_1.LoggingInterceptor()),
    (0, common_1.Controller)('admin/location'),
    __param(0, (0, mongoose_1.InjectModel)('location')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        location_service_1.LocationService])
], LocationController);
exports.LocationController = LocationController;
//# sourceMappingURL=location.controller.js.map