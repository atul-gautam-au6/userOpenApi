import { Injectable, UseFilters, UseInterceptors } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { HttpExceptionFilter } from "src/auth/exceptions/http.exception.filter";
import { LoggingInterceptor } from "src/auth/exceptions/logging.interceptor";
import { paginationUsable } from "src/config/email.validator";
import { ResourcesService } from "src/resources/resources.service";
import { hospital } from "../interfaces/hospital.interface";

@Injectable()
@UseFilters(new HttpExceptionFilter())
@UseInterceptors(new LoggingInterceptor())
export class HospitalService {
  constructor(
    @InjectModel("hospital")
    private readonly hospitalModel: Model<hospital>,
    private readonly resoureService: ResourcesService
  ) {}

  /**
   * @description create hospital
   * @param name
   * @param email
   * @param phone
   * @param location
   * @param point
   * @param bannerImage
   * @param image
   * @param description
   * @returns created object
   */
  async insertHospital(
    name: string,
    email: string,
    phone: number,
    location: string,
    point: any,
    bannerImage: string,
    image: string,
    description: string
  ) {
    const saveHospital = new this.hospitalModel({
      name,
      email,
      phone,
      location,
      point,
      bannerImage,
      image,
      description,
    });
    const result = await saveHospital.save();
    return result;
  }

  /**
   * @description update hospital
   * @param name
   * @param email
   * @param phone
   * @param location
   * @param point
   * @param bannerImage
   * @param image
   * @param description
   * @returns updated object
   */
  async updateHospital(
    id: string,
    name: string,
    email: string,
    phone: number,
    location: string,
    point: any,
    bannerImage: string,
    image: string,
    description: string,
    status: boolean
  ) {
    const result = this.hospitalModel.findByIdAndUpdate(
      id,
      {
        name,
        email,
        phone,
        location,
        point,
        bannerImage,
        image,
        description,
        status,
      },
      { new: true }
    );

    return result;
  }

  /**
   * @description   find hospital by id
   * @param id
   * @returns find object
   */
  async getHospitalById(id: string) {
    const result = await this.hospitalModel.findById(id);
    return result;
  }

  /**
   * @description get all hospitals
   * @returns list of hospitals
   */
  async getHospitalList(page: number, size: number, searchKey: string) {
    const { limit, skip, search } = paginationUsable(page, size, searchKey);

    const result = await this.hospitalModel.aggregate([
      {
        $match: {
          $expr: {
            $eq: ["$status", true],
          },
        },
      },
      {
        $match: {
          $expr: {
            $or: [
              {
                $regexMatch: {
                  input: { $toString: "$name" },
                  regex: search,
                  options: "i",
                },
              },
              {
                $regexMatch: {
                  input: { $toString: "$email" },
                  regex: search,
                  options: "i",
                },
              },
              {
                $regexMatch: {
                  input: { $toString: "$phone" },
                  regex: search,
                  options: "i",
                },
              },
            ],
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
