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
exports.CriticalHistorySevice = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const email_validator_1 = require("../../config/email.validator");
let CriticalHistorySevice = class CriticalHistorySevice {
    constructor(criticalHistoryModal) {
        this.criticalHistoryModal = criticalHistoryModal;
    }
    async insertCriticalHistory(CriticalHistory, status) {
        console.log(CriticalHistory, 'iside servie');
        try {
            const newCriticalHistory = new this.criticalHistoryModal({
                CriticalHistory: CriticalHistory,
                status: status,
            });
            await newCriticalHistory.save();
            return newCriticalHistory;
        }
        catch (error) {
            throw new common_1.NotFoundException('could not insert');
        }
    }
    async getAllCriticalHistory(page, pageSize) {
        const { limit, skip, search } = (0, email_validator_1.paginationUsable)(page, pageSize, '');
        try {
            const criticalHistoryList = await this.criticalHistoryModal
                .find({})
                .sort({ CriticalHistory: 'asc', _id: 'desc' })
                .limit(limit)
                .skip(skip);
            const count = await this.criticalHistoryModal.count().exec();
            return {
                data: criticalHistoryList,
                TotalCount: count,
            };
        }
        catch (error) {
            return {};
        }
    }
    async updateCriticalHistory(id, CriticalHistory, status) {
        try {
            const updatedProduct = await this.criticalHistoryModal.findById(id);
            if (CriticalHistory) {
                updatedProduct.CriticalHistory = CriticalHistory;
            }
            if (status) {
                updatedProduct.status = status;
            }
            updatedProduct.save();
            return updatedProduct;
        }
        catch (error) {
            throw new common_1.NotFoundException('Could not found Data');
        }
    }
    async getCriticalHistoryByid(id) {
        const result = await this.criticalHistoryModal.findById(id);
        return result;
    }
};
CriticalHistorySevice = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('criticalhistory')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CriticalHistorySevice);
exports.CriticalHistorySevice = CriticalHistorySevice;
//# sourceMappingURL=criticahistory.service.js.map