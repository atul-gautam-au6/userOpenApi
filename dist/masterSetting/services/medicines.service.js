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
exports.MedicinesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const email_validator_1 = require("../../config/email.validator");
let MedicinesService = class MedicinesService {
    constructor(MedicinesModal) {
        this.MedicinesModal = MedicinesModal;
    }
    async insertMedicine(MedicineName, Manufacturer, Salt, status) {
        console.log(MedicineName, "iside servie");
        try {
            const newMedicine = new this.MedicinesModal({
                MedicineName: MedicineName,
                Manufacturer: Manufacturer,
                Salt: Salt,
                status: status,
            });
            await newMedicine.save();
            return newMedicine;
        }
        catch (error) {
            throw new common_1.NotFoundException("could not insert");
        }
    }
    async getAllMedicines(page, pageSize) {
        const { limit, skip, search } = (0, email_validator_1.paginationUsable)(page, pageSize, "");
        try {
            const MedicineList = await this.MedicinesModal.find({})
                .sort({ MedicineName: "asc", _id: "desc" })
                .limit(limit)
                .skip(skip);
            const count = await this.MedicinesModal.count().exec();
            return {
                data: MedicineList,
                TotalCount: count,
            };
        }
        catch (error) {
            return {};
        }
    }
    async updateMedicine(id, MedicineName, Manufacturer, Salt, status) {
        try {
            const updatedMedicine = await this.MedicinesModal.findById(id);
            if (MedicineName) {
                updatedMedicine.MedicineName = MedicineName;
            }
            if (Manufacturer) {
                updatedMedicine.Manufacturer = Manufacturer;
            }
            if (Salt) {
                updatedMedicine.Salt = Salt;
            }
            if (status) {
                updatedMedicine.status = status;
            }
            updatedMedicine.save();
            return updatedMedicine;
        }
        catch (error) {
            throw new common_1.NotFoundException("Could not found Data");
        }
    }
    async getMedicineByid(id) {
        const result = await this.MedicinesModal.findById(id);
        return result;
    }
};
MedicinesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("medicines")),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MedicinesService);
exports.MedicinesService = MedicinesService;
//# sourceMappingURL=medicines.service.js.map