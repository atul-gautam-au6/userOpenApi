import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { paginationUsable } from 'src/config/email.validator';
import { criticalmedicalcondition } from '../interface/criticalmedicalcondition.interface';

@Injectable()
export class criticalmedicalconditionSevice {
  constructor(
    @InjectModel('criticalmedicalcondition')
    private readonly criticalMedicalConditionModal: Model<criticalmedicalcondition>,
  ) {}

  async insertCriticalMedicalCondition(
    medicalCondtionName: string,
    status: boolean,
  ) {
    try {
      const newMedicalCondition = new this.criticalMedicalConditionModal({
        MedicalConditionName: medicalCondtionName,
        status: status,
      });

      await newMedicalCondition.save();
      return newMedicalCondition;
    } catch (error) {
      throw new NotFoundException('could not insert');
    }
  }

  async getAllCriticalMedicalCondition(page: number, pageSize: number) {
    const { limit, skip, search } = paginationUsable(page, pageSize, '');

    try {
      const criticalMedicalcondtionList =
        await this.criticalMedicalConditionModal
          .find({})
          .sort({ MedicalConditionName: 'asc', _id: 'desc' })
          .limit(limit)
          .skip(skip);

      const count = await this.criticalMedicalConditionModal.count().exec();
      return {
        data: criticalMedicalcondtionList,
        TotalCount: count,
      };
    } catch (error) {
      return {};
    }
  }
  async updateMedicalCondition(
    id: string,
    MedicalConditionName: string,
    status: boolean,
  ) {
    try {
      const updatedProduct = await this.criticalMedicalConditionModal.findById(
        id,
      );
      if (MedicalConditionName) {
        updatedProduct.MedicalConditionName = MedicalConditionName;
      }
      if (status) {
        updatedProduct.status = status;
      }
      updatedProduct.save();
      return updatedProduct;
    } catch (error) {
      throw new NotFoundException('Could not found Data');
    }
  }
  async getCriticalMedicalConditionByid(id: string) {
    const result = await this.criticalMedicalConditionModal.findById(id);
    return result;
  }
}
