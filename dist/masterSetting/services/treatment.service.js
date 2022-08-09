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
exports.TreatmentService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const email_validator_1 = require("../../config/email.validator");
let TreatmentService = class TreatmentService {
    constructor(TreatmentModal) {
        this.TreatmentModal = TreatmentModal;
    }
    async insertTreatment(TreatmentName, status) {
        console.log(TreatmentName, 'iside servie');
        try {
            const newTreatment = new this.TreatmentModal({
                TreatmentName: TreatmentName,
                status: status,
            });
            await newTreatment.save();
            return newTreatment;
        }
        catch (error) {
            throw new common_1.NotFoundException('could not insert');
        }
    }
    async getAllTreatments(page, pageSize) {
        const { limit, skip, search } = (0, email_validator_1.paginationUsable)(page, pageSize, '');
        try {
            const TreatmentList = await this.TreatmentModal.find({})
                .sort({ TreatmentName: 'asc', _id: 'desc' })
                .limit(limit)
                .skip(skip);
            const count = await this.TreatmentModal.count().exec();
            return {
                data: TreatmentList,
                TotalCount: count,
            };
        }
        catch (error) {
            return {};
        }
    }
    async updateTreatment(id, TreatmentName, status) {
        try {
            const updatedTreatment = await this.TreatmentModal.findById(id);
            if (TreatmentName) {
                updatedTreatment.TreatmentName = TreatmentName;
            }
            if (status) {
                updatedTreatment.status = status;
            }
            updatedTreatment.save();
            return updatedTreatment;
        }
        catch (error) {
            throw new common_1.NotFoundException('Could not found Data');
        }
    }
    async getTreatmentByid(id) {
        const result = await this.TreatmentModal.findById(id);
        return result;
    }
};
TreatmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Treatment')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TreatmentService);
exports.TreatmentService = TreatmentService;
//# sourceMappingURL=treatment.service.js.map