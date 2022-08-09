import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { paginationUsable } from 'src/config/email.validator';
import { Healthcondition } from '../interface/heathcondition.interface';

@Injectable()
export class HealthConditionService {
  constructor(
    @InjectModel('healthcondition')
    private readonly healthConditionModal: Model<Healthcondition>,
  ) {}

  async insertHealthCondition(HealthCondition: string, status: boolean) {
    console.log(HealthCondition, 'iside servie');
    try {
      const newHealthCondition = new this.healthConditionModal({
        HealthCondition: HealthCondition,
        status: status,
      });

      await newHealthCondition.save();
      return newHealthCondition;
    } catch (error) {
      throw new NotFoundException('could not insert');
    }
  }

  async getAllHealthCondition(page: number, pageSize: number) {
    const { limit, skip, search } = paginationUsable(page, pageSize, '');

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
    } catch (error) {
      return {};
    }
  }
  async updateCriticalHistory(
    id: string,
    HealthCondition: string,
    status: boolean,
  ) {
    try {
      const updatedHealthCondition = await this.healthConditionModal.findById(
        id,
      );
      if (HealthCondition) {
        updatedHealthCondition.HealthCondition = HealthCondition;
      }
      if (status) {
        updatedHealthCondition.status = status;
      }
      updatedHealthCondition.save();
      return updatedHealthCondition;
    } catch (error) {
      throw new NotFoundException('Could not found Data');
    }
  }
  async getHealthConditionByid(id: string) {
    const result = await this.healthConditionModal.findById(id);
    return result;
  }
}
