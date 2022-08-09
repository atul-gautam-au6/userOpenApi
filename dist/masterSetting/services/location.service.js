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
exports.LocationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const http_exception_filter_1 = require("../../auth/exceptions/http.exception.filter");
const logging_interceptor_1 = require("../../auth/exceptions/logging.interceptor");
const email_validator_1 = require("../../config/email.validator");
let LocationService = class LocationService {
    constructor(locationModel) {
        this.locationModel = locationModel;
    }
    async insertLocation(state, city, pinCode) {
        const saveLocation = new this.locationModel({
            state,
            city,
            pinCode,
        });
        const result = await saveLocation.save();
        return result;
    }
    async updateLocation(id, state, city, pinCode, status) {
        const saveLocation = await this.locationModel.findByIdAndUpdate(id, {
            state,
            city,
            pinCode,
            status,
        }, { new: true });
        return saveLocation;
    }
    async getLocationById(id) {
        const result = await this.locationModel.findById(id);
        return result;
    }
    async getAllLocation(page, size, searchKey) {
        const { limit, skip, search } = (0, email_validator_1.paginationUsable)(page, size, searchKey);
        const result = await this.locationModel.aggregate([
            {
                $match: {
                    $expr: {
                        $regexMatch: {
                            input: { $toString: '$state' },
                            regex: search,
                            options: 'i',
                        },
                    },
                },
            },
            {
                $sort: {
                    createdAt: -1,
                },
            },
            {
                $facet: {
                    total: [
                        {
                            $count: 'createdAt',
                        },
                    ],
                    data: [
                        {
                            $addFields: {
                                _id: '$_id',
                            },
                        },
                    ],
                },
            },
            {
                $unwind: '$total',
            },
            {
                $project: {
                    data: {
                        $slice: [
                            '$data',
                            skip,
                            {
                                $ifNull: [limit, '$total.createdAt'],
                            },
                        ],
                    },
                    meta: {
                        total: '$total.createdAt',
                        limit: {
                            $literal: limit,
                        },
                        page: {
                            $literal: skip / limit + 1,
                        },
                        pages: {
                            $ceil: {
                                $divide: ['$total.createdAt', limit],
                            },
                        },
                    },
                },
            },
        ]);
        return result;
    }
};
LocationService = __decorate([
    (0, common_1.Injectable)(),
    (0, common_1.UseFilters)(new http_exception_filter_1.HttpExceptionFilter()),
    (0, common_1.UseInterceptors)(new logging_interceptor_1.LoggingInterceptor()),
    __param(0, (0, mongoose_1.InjectModel)('location')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], LocationService);
exports.LocationService = LocationService;
//# sourceMappingURL=location.service.js.map