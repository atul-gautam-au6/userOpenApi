import { Injectable, UseFilters, UseInterceptors } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpExceptionFilter } from 'src/auth/exceptions/http.exception.filter';
import { LoggingInterceptor } from 'src/auth/exceptions/logging.interceptor';
import { paginationUsable } from 'src/config/email.validator';
import { relation } from '../interface/relation.interface';

@Injectable()
@UseFilters(new HttpExceptionFilter())
@UseInterceptors(new LoggingInterceptor())
export class RelationService {
  constructor(
    @InjectModel('relation')
    private readonly relationModel: Model<relation>,
  ) {}

  /**
   * @description save relation
   * @param relationship
   * @param type
   * @returns created object
   */
  async insertRelation(relationship: string, type: string) {
    const saveRelation = new this.relationModel({
      relationship,
      type,
    });
    const result = await saveRelation.save();
    return result;
  }

  /**
   * @description  update relation
   * @param id
   * @param relationship
   * @param type
   * @param status
   * @returns updated object
   */
  async updateRelation(
    id: string,
    relationship: string,
    type: string,
    status: boolean,
  ) {
    const saveRelation = await this.relationModel.findByIdAndUpdate(
      id,
      {
        relationship,
        type,
        status,
      },
      { new: true },
    );

    return saveRelation;
  }

  /**
   *
   * @param id
   * @returns find object
   */
  async getRelationById(id: string) {
    const result = await this.relationModel.findById(id);
    return result;
  }

  /**
   * @description get all relations
   * @returns list of relation
   */
  async getAllRelation(page: number, size: number, searchKey: string) {
    const { limit, skip, search } = paginationUsable(page, size, searchKey);

    const result = await this.relationModel.aggregate([
      {
        $match: {
          $expr: {
            $regexMatch: {
              input: { $toString: '$relationship' },
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
