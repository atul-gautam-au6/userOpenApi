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
exports.criticalmedicalconditionSevice = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const email_validator_1 = require("../../config/email.validator");
let criticalmedicalconditionSevice = class criticalmedicalconditionSevice {
    constructor(criticalMedicalConditionModal) {
        this.criticalMedicalConditionModal = criticalMedicalConditionModal;
    }
    async insertCriticalMedicalCondition(medicalCondtionName, status) {
        try {
            const newMedicalCondition = new this.criticalMedicalConditionModal({
                MedicalConditionName: medicalCondtionName,
                status: status,
            });
            await newMedicalCondition.save();
            return newMedicalCondition;
        }
        catch (error) {
            throw new common_1.NotFoundException("could not insert");
        }
    }
    async getAllCriticalMedicalCondition(page, pageSize) {
        const { limit, skip, search } = (0, email_validator_1.paginationUsable)(page, pageSize, "");
        try {
            const criticalMedicalcondtionList = await this.criticalMedicalConditionModal
                .find({})
                .sort({ MedicalConditionName: "asc", _id: "desc" })
                .limit(limit)
                .skip(skip);
            const count = await this.criticalMedicalConditionModal.count().exec();
            return {
                data: criticalMedicalcondtionList,
                TotalCount: count,
            };
        }
        catch (error) {
            return {};
        }
    }
    async updateMedicalCondition(id, MedicalConditionName, status) {
        try {
            const updatedProduct = await this.criticalMedicalConditionModal.findById(id);
            if (MedicalConditionName) {
                updatedProduct.MedicalConditionName = MedicalConditionName;
            }
            if (status) {
                updatedProduct.status = status;
            }
            updatedProduct.save();
            return updatedProduct;
        }
        catch (error) {
            throw new common_1.NotFoundException("Could not found Data");
        }
    }
    async getCriticalMedicalConditionByid(id) {
        const result = await this.criticalMedicalConditionModal.findById(id);
        return result;
    }
};
criticalmedicalconditionSevice = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("criticalmedicalcondition")),
    __metadata("design:paramtypes", [mongoose_2.Model])
], criticalmedicalconditionSevice);
exports.criticalmedicalconditionSevice = criticalmedicalconditionSevice;
//# sourceMappingURL=criticalmedicalcondition.service.js.map