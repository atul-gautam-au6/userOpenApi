import { Injectable, UseFilters, UseInterceptors } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpExceptionFilter } from 'src/auth/exceptions/http.exception.filter';
import { LoggingInterceptor } from 'src/auth/exceptions/logging.interceptor';
import { paginationUsable } from 'src/config/email.validator';
import { specialization } from '../interface/specialization.interface';

@Injectable()
@UseFilters(new HttpExceptionFilter())
@UseInterceptors(new LoggingInterceptor())
export class SpecializationService {
  constructor(
    @InjectModel('specialization')
    private readonly specializationModel: Model<specialization>,
  ) {}

  /**
   * @description create specialition
   * @param name specialization name
   * @param status specialization status
   * @returns created object
   */
  async insertSpecialization(name: string, status: boolean) {
    const savedSpecialization = await this.specializationModel.create({
      name,
      status,
    });

    return savedSpecialization;
  }

  /**
   *
   * @param id specialization id
   * @param name specialization name
   * @param status specialization status
   * @returns updated object
   */
  async updateSpecialization(id: string, name: string, status: boolean) {
    const result = await this.specializationModel.findByIdAndUpdate(
      id,
      {
        name,
        status,
      },
      { new: true },
    );
    return result;
  }

  /**
   *
   * @param id specialization id
   * @returns find object
   */
  async getSpecializationByid(id: string) {
    const result = await this.specializationModel.findById(id);
    return result;
  }

  /**
   *@description get all specialization
   * @param page page number
   * @param size size of page
   * @param searchKey any search key
   */
  async getAllSpecialization(page: number, size: number, searchKey: string) {
    const { limit, skip, search } = paginationUsable(page, size, searchKey);
    const result = await this.specializationModel.aggregate([
      {
        $match: {
          $expr: {
            $regexMatch: {
              input: { $toString: '$name' },
              regex: search,
              options: 'i',
            },
          },
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $facet: {
          total: [
            {
              $count: 'createdAt',
            },
          ],
          data: [
            {
              $addFields: {
                _id: '$_id',
              },
            },
          ],
        },
      },
      {
        $unwind: '$total',
      },
      {
        $project: {
          data: {
            $slice: [
              '$data',
              skip,
              {
                $ifNull: [limit, '$total.createdAt'],
              },
            ],
          },
          meta: {
            total: '$total.createdAt',
            limit: {
              $literal: limit,
            },
            page: {
              $literal: skip / limit + 1,
            },
            pages: {
              $ceil: {
                $divide: ['$total.createdAt', limit],
              },
            },
          },
        },
      },
    ]);
    return result;
  }
}
