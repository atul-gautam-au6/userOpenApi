import { Injectable, UseFilters, UseInterceptors } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { HttpExceptionFilter } from "src/auth/exceptions/http.exception.filter";
import { LoggingInterceptor } from "src/auth/exceptions/logging.interceptor";
import { paginationUsable } from "src/config/email.validator";
import { logo } from "../interface/logo.interface";

@Injectable()
@UseFilters(new HttpExceptionFilter())
@UseInterceptors(new LoggingInterceptor())
export class LogoService {
  constructor(
    @InjectModel("logo") private readonly serviceModel: Model<logo>
  ) {}

  /*
        @desc
            create logo
            accept logo url and status as an string and boolean
            return created object
    */
  async insertLogo(name: string, status: boolean) {
    const saveLogo = new this.serviceModel({ logo: name, status });
    const result = await saveLogo.save();
    return result;
  }

  /*
        @desc
            update logo
            accept logo url and status as an string and boolean
            return created object
    */
  async updateLogo(id: string, name: string, status: boolean) {
    const saveLogo = await this.serviceModel.findByIdAndUpdate(
      id,
      {
        name,
        status,
      },
      { new: true }
    );

    return saveLogo;
  }

  /*
        @desc
            find one logo by id
            accept logo url and status as an string and boolean
            return created object
    */
  async getLogoById(id: string) {
    const getLogo = await this.serviceModel
      .findById(id)
      .select("-status -createdAt -updatedAt");

    return getLogo;
  }

  /*
        @desc
            get all logo
            return created object
    */
  async getAllLogo(page: number, size: number, searchKey: string) {
    const { limit, skip, search } = paginationUsable(page, size, searchKey);

    const getLogo = await this.serviceModel.aggregate([
      // {
      //   $match: {
      //     $expr: {
      //       $and: [
      //         {
      //           $eq: ['$isPodcast', false],
      //         },
      //         {
      //           $eq: ['$isQuetion', false],
      //         },
      //       ],
      //     },
      //   },
      // },

      {
        $sort: {
          _id: -1,
        },
      },
      {
        $facet: {
          total: [
            {
              $count: "createdAt",
            },
          ],
          data: [
            {
              $addFields: {
                _id: "$_id",
              },
            },
          ],
        },
      },
      {
        $unwind: "$total",
      },
      {
        $project: {
          data: {
            $slice: [
              "$data",
              skip,
              {
                $ifNull: [limit, "$total.createdAt"],
              },
            ],
          },
          meta: {
            total: "$total.createdAt",
            limit: {
              $literal: limit,
            },
            page: {
              $literal: skip / limit + 1,
            },
            pages: {
              $ceil: {
                $divide: ["$total.createdAt", limit],
              },
            },
          },
        },
      },
    ]);

    return getLogo;
  }
}
