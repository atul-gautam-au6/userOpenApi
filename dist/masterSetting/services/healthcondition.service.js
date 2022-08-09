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
exports.HealthConditionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const email_validator_1 = require("../../config/email.validator");
let HealthConditionService = class HealthConditionService {
    constructor(healthConditionModal) {
        this.healthConditionModal = healthConditionModal;
    }
    async insertHealthCondition(HealthCondition, status) {
        console.log(HealthCondition, 'iside servie');
        try {
            const newHealthCondition = new this.healthConditionModal({
                HealthCondition: HealthCondition,
                status: status,
            });
            await newHealthCondition.save();
            return newHealthCondition;
        }
        catch (error) {
            throw new common_1.NotFoundException('could not insert');
        }
    }
    async getAllHealthCondition(page, pageSize) {
        const { limit, skip, search } = (0, email_validator_1.paginationUsable)(page, pageSize, '');
        try {
            const healthconditionList = await this.healthConditionModal
                .find({})
                .sort({ CriticalHistory: 'asc', _id: 'desc' })
                .limit(limit)
                .skip(skip);
            const count = await this.healthConditionModal.count().exec();
            return {
                data: healthconditionList,
                TotalCount: count,
            };
        }
        catch (error) {
            return {};
        }
    }
    async updateCriticalHistory(id, HealthCondition, status) {
        try {
            const updatedHealthCondition = await this.healthConditionModal.findById(id);
            if (HealthCondition) {
                updatedHealthCondition.HealthCondition = HealthCondition;
            }
            if (status) {
                updatedHealthCondition.status = status;
            }
            updatedHealthCondition.save();
            return updatedHealthCondition;
        }
        catch (error) {
            throw new common_1.NotFoundException('Could not found Data');
        }
    }
    async getHealthConditionByid(id) {
        const result = await this.healthConditionModal.findById(id);
        return result;
    }
};
HealthConditionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('healthcondition')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], HealthConditionService);
exports.HealthConditionService = HealthConditionService;
//# sourceMappingURL=healthcondition.service.js.map