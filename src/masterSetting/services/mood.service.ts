import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { paginationUsable } from "src/config/email.validator";
import { mood } from "../interface/mood.interface";

@Injectable()
export class MoodService {
  constructor(@InjectModel("mood") private readonly moodModel: Model<mood>) {}
  /*
    @desc
        create Mood
        accept title and Icon(mandatory),status is  boolean
        return  created object
  */
  async insertMood(title: string, icon: string, status: boolean) {
    const addedMood = await this.moodModel.create({ title, icon, status });
    return addedMood;
  }
  /*
    @desc
        Update Mood
        accept title and Icon(mandatory),status is  boolean
        return  created object
  */
  async updateMood(id: string, title: string, status: boolean) {
    const updatedMood = await this.moodModel.findByIdAndUpdate(
      id,
      {
        title,
        status,
      },
      { new: true }
    );

    return updatedMood;
  }
  /*
    @desc
        Delete Mood
        accept Id
        return  created object
  */
  async deleteMood(id: string) {
    const deletedMood = await this.moodModel.deleteOne({ _id: id }).exec();
    return deletedMood;
  }
  /*
    @desc
        Get all moods
       Page number
       size 
       and search key
      
  */
  async getAllMoods(page: number, size: number, searchKey: string) {
    const { limit, skip, search } = paginationUsable(page, size, searchKey);
    const getMoods = this.moodModel.aggregate([
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

    return getMoods;
  }
  async getMoodByid(id: string) {
    const result = await this.moodModel.findById(id);
    return result;
  }
}
