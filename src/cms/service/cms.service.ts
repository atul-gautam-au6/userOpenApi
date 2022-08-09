import { Injectable, UseFilters, UseInterceptors } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpExceptionFilter } from 'src/auth/exceptions/http.exception.filter';
import { LoggingInterceptor } from 'src/auth/exceptions/logging.interceptor';
import { paginationUsable } from 'src/config/email.validator';
import { cms } from '../interface/cms.interface';

@Injectable()
@UseFilters(new HttpExceptionFilter())
@UseInterceptors(new LoggingInterceptor())
export class CmsService {
  constructor(@InjectModel('cms') private readonly cmsModel: Model<cms>) {}

  /**
   * @description   create cms
   * @param name
   * @param description
   * @returns created object
   */
  async insertCms(name: string, description: string) {
    const result = await this.cmsModel.create({
      name,
      description,
    });
    return result;
  }

  /**
   * @description update cms
   * @param id
   * @param name
   * @param description
   * @param status
   * @returns saved object
   */
  async updateCms(
    id: string,
    name: string,
    description: string,
    status: boolean,
  ) {
    const result = await this.cmsModel.findByIdAndUpdate(
      id,
      {
        name,
        description,
        status,
      },
      { new: true },
    );
    return result;
  }

  /**
   * @description get cms by id
   * @param id
   * @returns find object
   */
  async getCmsById(id: string) {
    const result = await this.cmsModel.findById(id);
    return result;
  }

  /**
   *
   * @returns all cms list
   */
  async getAllCms(page: number, size: number, searchKey: string) {
    const { limit, skip, search } = paginationUsable(page, size, searchKey);
    const result = await this.cmsModel.aggregate([
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
          _id: -1,
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
