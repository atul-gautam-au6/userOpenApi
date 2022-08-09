import { Injectable, UseFilters, UseInterceptors } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpExceptionFilter } from 'src/auth/exceptions/http.exception.filter';
import { LoggingInterceptor } from 'src/auth/exceptions/logging.interceptor';
import { paginationUsable } from 'src/config/email.validator';
import { category } from '../interface/category.interface';

@Injectable()
@UseFilters(new HttpExceptionFilter())
@UseInterceptors(new LoggingInterceptor())
export class CategoryService {
  constructor(
    @InjectModel('category') private readonly categoryModel: Model<category>,
  ) {}

  /**
   * @desc create new category
   * @param name string
   * @param status boolean
   * @param isPodcast boolean
   * @param isQuetion boolean
   * @returns created object
   */
  async insertCategory(
    name: string,
    status: boolean,
    isPodcast: boolean,
    isQuetion: boolean,
  ) {
    const savedCategory = await this.categoryModel.create({
      name,
      status,
      isPodcast,
      isQuetion,
    });

    // const result = await savedCategory.save();
    return savedCategory;
  }

  /*
  @desc
    update category
    accept name and status(optional) as an string and boolean
    return  created object
*/
  async updateCategory(
    id: string,
    name: string,
    status: boolean,
    isPodcast: boolean,
    isQuetion: boolean,
  ) {
    const result = await this.categoryModel.findByIdAndUpdate(
      id,
      {
        name,
        status,
        isPodcast,
        isQuetion,
      },
      { new: true },
    );
    return result;
  }

  /*
   @desc
    get category details by id
    accept id as an string
    return  created object
   */
  async getCategoryByid(id: string) {
    const result = await this.categoryModel
      .findById(id)
      .select('-isQuetion -isPodcast');
    return result;
  }

  /**
   *@description get all category
   * @param page page number
   * @param size size of page
   * @param searchKey any search key
   * @param type category type[isPodcast,isQuestion or normal category type]
   */
  async getAllCategory(
    page: number,
    size: number,
    searchKey: string,
    type: string,
  ) {
    const { limit, skip, search } = paginationUsable(page, size, searchKey);
    const isPodcast = type == 'isPodcast' ? true : false;
    const isQuetion = type == 'isQuetion' ? true : false;

    const result = await this.categoryModel.aggregate([
      {
        $match: {
          $expr: {
            $and:
              !isPodcast && !isQuetion
                ? [
                    {
                      $eq: ['$isPodcast', false],
                    },
                    {
                      $eq: ['$isQuetion', false],
                    },
                  ]
                : isPodcast
                ? [
                    {
                      $eq: ['$isPodcast', true],
                    },
                  ]
                : [
                    {
                      $eq: ['$isQuetion', true],
                    },
                  ],
          },
          // $expr: {
          // $and: [
          //   {
          //     $eq: ['$isPodcast', false],
          //   },
          //   {
          //     $eq: ['$isQuetion', false],
          //   },
          // ],
          // },
        },
      },
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
