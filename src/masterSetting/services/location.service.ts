import { Injectable, UseFilters, UseInterceptors } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { HttpExceptionFilter } from "src/auth/exceptions/http.exception.filter";
import { LoggingInterceptor } from "src/auth/exceptions/logging.interceptor";
import { paginationUsable } from "src/config/email.validator";
import { location } from "../interface/location.interface";

@Injectable()
@UseFilters(new HttpExceptionFilter())
@UseInterceptors(new LoggingInterceptor())
export class LocationService {
  constructor(
    @InjectModel("location")
    private readonly locationModel: Model<location>
  ) {}

  /**
   * @description save location
   * @param state
   * @param city
   * @param pinCode
   * @returns created object
   */
  async insertLocation(state: string, city: string, pinCode: number) {
    const saveLocation = new this.locationModel({
      state,
      city,
      pinCode,
    });
    const result = await saveLocation.save();
    return result;
  }

  /**
   * @description  update location
   * @param id
   * @param state
   * @param city
   * @param pinCode
   * @param status
   * @returns updated object
   */
  async updateLocation(
    id: string,
    state: string,
    city: string,
    pinCode: number,
    status: boolean
  ) {
    const saveLocation = await this.locationModel.findByIdAndUpdate(
      id,
      {
        state,
        city,
        pinCode,
        status,
      },
      { new: true }
    );

    return saveLocation;
  }

  /**
   *
   * @param id
   * @returns find object
   */
  async getLocationById(id: string) {
    const result = await this.locationModel.findById(id);
    return result;
  }

  async getAllLocation(page: number, size: number, searchKey: string) {
    const { limit, skip, search } = paginationUsable(page, size, searchKey);

    const result = await this.locationModel.aggregate([
      {
        $match: {
          $expr: {
            $regexMatch: {
              input: { $toString: "$state" },
              regex: search,
              options: "i",
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
    return result;
  }
}
