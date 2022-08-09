import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { paginationUsable } from "src/config/email.validator";
import { Healthcondition } from "../interface/heathcondition.interface";
import { Treatment } from "../interface/treatment.interface";

@Injectable()
export class TreatmentService {
  constructor(
    @InjectModel("Treatment") private readonly TreatmentModal: Model<Treatment>
  ) {}

  async insertTreatment(TreatmentName: string, status: boolean) {
    console.log(TreatmentName, "iside servie");
    try {
      const newTreatment = new this.TreatmentModal({
        TreatmentName: TreatmentName,
        status: status,
      });

      await newTreatment.save();
      return newTreatment;
    } catch (error) {
      throw new NotFoundException("could not insert");
    }
  }

  async getAllTreatments(page: number, pageSize: number) {
    const { limit, skip, search } = paginationUsable(page, pageSize, "");

    try {
      const TreatmentList = await this.TreatmentModal.find({})
        .sort({ TreatmentName: "asc", _id: "desc" })
        .limit(limit)
        .skip(skip);

      const count = await this.TreatmentModal.count().exec();
      return {
        data: TreatmentList,
        TotalCount: count,
      };
    } catch (error) {
      return {};
    }
  }
  async updateTreatment(id: string, TreatmentName: string, status: boolean) {
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
    } catch (error) {
      throw new NotFoundException("Could not found Data");
    }
  }
  async getTreatmentByid(id: string) {
    const result = await this.TreatmentModal.findById(id);
    return result;
  }
}
