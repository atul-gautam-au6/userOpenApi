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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const http_exception_filter_1 = require("../../auth/exceptions/http.exception.filter");
const logging_interceptor_1 = require("../../auth/exceptions/logging.interceptor");
const email_validator_1 = require("../../config/email.validator");
let CategoryService = class CategoryService {
    constructor(categoryModel) {
        this.categoryModel = categoryModel;
    }
    async insertCategory(name, status, isPodcast, isQuetion) {
        const savedCategory = await this.categoryModel.create({
            name,
            status,
            isPodcast,
            isQuetion,
        });
        return savedCategory;
    }
    async updateCategory(id, name, status, isPodcast, isQuetion) {
        const result = await this.categoryModel.findByIdAndUpdate(id, {
            name,
            status,
            isPodcast,
            isQuetion,
        }, { new: true });
        return result;
    }
    async getCategoryByid(id) {
        const result = await this.categoryModel
            .findById(id)
            .select('-isQuetion -isPodcast');
        return result;
    }
    async getAllCategory(page, size, searchKey, type) {
        const { limit, skip, search } = (0, email_validator_1.paginationUsable)(page, size, searchKey);
        const isPodcast = type == 'isPodcast' ? true : false;
        const isQuetion = type == 'isQuetion' ? true : false;
        const result = await this.categoryModel.aggregate([
            {
                $match: {
                    $expr: {
                        $and: !isPodcast && !isQuetion
                            ? [
                                {
                                    $eq: ['$isPodcast', false],
                                },
                                {
                                    $eq: ['$isQuetion', false],
                                },
                            ]
                            : isPodcast
                                ? [
                                    {
                                        $eq: ['$isPodcast', true],
                                    },
                                ]
                                : [
                                    {
                                        $eq: ['$isQuetion', true],
                                    },
                                ],
                    },
                },
            },
            {
                $match: {
                    $expr: {
                        $regexMatch: {
                            input: { $toString: '$name' },
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
CategoryService = __decorate([
    (0, common_1.Injectable)(),
    (0, common_1.UseFilters)(new http_exception_filter_1.HttpExceptionFilter()),
    (0, common_1.UseInterceptors)(new logging_interceptor_1.LoggingInterceptor()),
    __param(0, (0, mongoose_1.InjectModel)('category')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CategoryService);
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map