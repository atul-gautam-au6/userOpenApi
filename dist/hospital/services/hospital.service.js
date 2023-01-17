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
exports.HospitalService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const http_exception_filter_1 = require("../../auth/exceptions/http.exception.filter");
const logging_interceptor_1 = require("../../auth/exceptions/logging.interceptor");
const email_validator_1 = require("../../config/email.validator");
const resources_service_1 = require("../../resources/resources.service");
let HospitalService = class HospitalService {
    constructor(hospitalModel, resoureService) {
        this.hospitalModel = hospitalModel;
        this.resoureService = resoureService;
    }
    async insertHospital(name, email, phone, location, point, bannerImage, image, description) {
        const saveHospital = new this.hospitalModel({
            name,
            email,
            phone,
            location,
            point,
            bannerImage,
            image,
            description,
        });
        const result = await saveHospital.save();
        return result;
    }
    async updateHospital(id, name, email, phone, location, point, bannerImage, image, description, status) {
        const result = this.hospitalModel.findByIdAndUpdate(id, {
            name,
            email,
            phone,
            location,
            point,
            bannerImage,
            image,
            description,
            status,
        }, { new: true });
        return result;
    }
    async getHospitalById(id) {
        const result = await this.hospitalModel.findById(id);
        return result;
    }
    async getHospitalList(page, size, searchKey) {
        const { limit, skip, search } = (0, email_validator_1.paginationUsable)(page, size, searchKey);
        const result = await this.hospitalModel.aggregate([
            {
                $match: {
                    $expr: {
                        $eq: ["$status", true],
                    },
                },
            },
            {
                $match: {
                    $expr: {
                        $or: [
                            {
                                $regexMatch: {
                                    input: { $toString: "$name" },
                                    regex: search,
                                    options: "i",
                                },
                            },
                            {
                                $regexMatch: {
                                    input: { $toString: "$email" },
                                    regex: search,
                                    options: "i",
                                },
                            },
                            {
                                $regexMatch: {
                                    input: { $toString: "$phone" },
                                    regex: search,
                                    options: "i",
                                },
                            },
                        ],
                    },
                },
            },
            {
                $sort: {
                    _id: -1,
                },
            },
            {
                $facet: {
                    total: [
                        {
                            $count: "createdAt",
                        },
                    ],
                    data: [
                        {
                            $addFields: {
                                _id: "$_id",
                            },
                        },
                    ],
                },
            },
            {
                $unwind: "$total",
            },
            {
                $project: {
                    data: {
                        $slice: [
                            "$data",
                            skip,
                            {
                                $ifNull: [limit, "$total.createdAt"],
                            },
                        ],
                    },
                    meta: {
                        total: "$total.createdAt",
                        limit: {
                            $literal: limit,
                        },
                        page: {
                            $literal: skip / limit + 1,
                        },
                        pages: {
                            $ceil: {
                                $divide: ["$total.createdAt", limit],
                            },
                        },
                    },
                },
            },
        ]);
        return result;
    }
};
HospitalService = __decorate([
    (0, common_1.Injectable)(),
    (0, common_1.UseFilters)(new http_exception_filter_1.HttpExceptionFilter()),
    (0, common_1.UseInterceptors)(new logging_interceptor_1.LoggingInterceptor()),
    __param(0, (0, mongoose_1.InjectModel)("hospital")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        resources_service_1.ResourcesService])
], HospitalService);
exports.HospitalService = HospitalService;
//# sourceMappingURL=hospital.service.js.map