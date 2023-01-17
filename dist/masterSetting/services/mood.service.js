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
exports.MoodService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const email_validator_1 = require("../../config/email.validator");
let MoodService = class MoodService {
    constructor(moodModel) {
        this.moodModel = moodModel;
    }
    async insertMood(title, icon, status) {
        const addedMood = await this.moodModel.create({ title, icon, status });
        return addedMood;
    }
    async updateMood(id, title, status) {
        const updatedMood = await this.moodModel.findByIdAndUpdate(id, {
            title,
            status,
        }, { new: true });
        return updatedMood;
    }
    async deleteMood(id) {
        const deletedMood = await this.moodModel.deleteOne({ _id: id }).exec();
        return deletedMood;
    }
    async getAllMoods(page, size, searchKey) {
        const { limit, skip, search } = (0, email_validator_1.paginationUsable)(page, size, searchKey);
        const getMoods = this.moodModel.aggregate([
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
        return getMoods;
    }
    async getMoodByid(id) {
        const result = await this.moodModel.findById(id);
        return result;
    }
};
MoodService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("mood")),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MoodService);
exports.MoodService = MoodService;
//# sourceMappingURL=mood.service.js.map