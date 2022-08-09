import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { paginationUsable } from "src/config/email.validator";
import { criticalhistory } from "../interface/criticalhistory";

@Injectable()
export class CriticalHistorySevice {
  constructor(
    @InjectModel("criticalhistory")
    private readonly criticalHistoryModal: Model<criticalhistory>
  ) {}

  async insertCriticalHistory(CriticalHistory: string, status: boolean) {
    console.log(CriticalHistory, "iside servie");
    try {
      const newCriticalHistory = new this.criticalHistoryModal({
        CriticalHistory: CriticalHistory,
        status: status,
      });

      await newCriticalHistory.save();
      return newCriticalHistory;
    } catch (error) {
      throw new NotFoundException("could not insert");
    }
  }

  async getAllCriticalHistory(page: number, pageSize: number) {
    const { limit, skip, search } = paginationUsable(page, pageSize, "");

    try {
      const criticalHistoryList = await this.criticalHistoryModal
        .find({})
        .sort({ CriticalHistory: "asc", _id: "desc" })
        .limit(limit)
        .skip(skip);

      const count = await this.criticalHistoryModal.count().exec();
      return {
        data: criticalHistoryList,
        TotalCount: count,
      };
    } catch (error) {
      return {};
    }
  }
  async updateCriticalHistory(
    id: string,
    CriticalHistory: string,
    status: boolean
  ) {
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
    } catch (error) {
      throw new NotFoundException("Could not found Data");
    }
  }
  async getCriticalHistoryByid(id: string) {
    const result = await this.criticalHistoryModal.findById(id);
    return result;
  }
}
