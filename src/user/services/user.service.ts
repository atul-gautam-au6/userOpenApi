import {
  Injectable,
  UnauthorizedException,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Schema, Model } from 'mongoose';
import { HttpExceptionFilter } from 'src/auth/exceptions/http.exception.filter';
import { LoggingInterceptor } from 'src/auth/exceptions/logging.interceptor';
import { paginationUsable } from 'src/config/email.validator';
import { user } from '../interfaces/user.interface';

@Injectable()
@UseInterceptors(new LoggingInterceptor())
@UseFilters(new HttpExceptionFilter())
export class UserService {
  constructor(@InjectModel('user') private readonly userModel: Model<user>) {}

  /*
    @desc       
        create user
        accept name, email, password as an string
        return entire  object
  */
  async insertUser(
    name: string,
    email: string,
    password: string,
    isSubAdmin: boolean,
    phone: number,
    otp: number,
  ) {
    const savedUser = new this.userModel({
      name,
      email,
      phone,
      password,
      isSubAdmin,
      otp,
    });

    const result = await savedUser.save();
    return result;
  }

  /*
    @desc      
        update user
        accept name, email, password phone isSubAdmin and password, an string
        return entire  object
  */
  async updateUser(
    id: string,
    name: string,
    email: string,
    isSubAdmin: boolean,
    phone: number,
    status: boolean,
  ) {
    const result = await this.userModel.findByIdAndUpdate(
      id,
      {
        name,
        email,
        phone,
        isSubAdmin,
        status,
      },
      { new: true },
    );

    return result;
  }

  /*
    @desc
        get user details by id      
        accept user id, an string
        return entire object
  */

  async getUserById(id: string) {
    const result = await this.userModel
      .findById(id)
      .select('-password -isAdmin -isSubAdmin');

    return result;
  }

  /*
    @desc
        get user details by email      
        accept user email, an string
        return entire object
  */
  async getUserByEmail(email: string) {
    const result = await this.userModel
      .findOne({ email })
      .select('-password -isAdmin -isSubAdmin');

    return result;
  }

  async successVerification(id: string) {
    const updateUser = await this.userModel.findByIdAndUpdate(
      id,
      {
        emailVerified: true,
        otp: null,
      },
      { new: true },
    );
  }

  /*
    @desc      
        get user all
        secured by admin
        return entire  object
  */
  async getAllUsers(
    // page: number, size: number, searchKey: string
    ) {
    // const { limit, skip, search } = paginationUsable(page, size, searchKey);
const result = await this.userModel.find()
    // const result = await this.userModel.aggregate([
    //   {
    //     $match: {
    //       $expr: {
    //         $regexMatch: {
    //           input: { $toString: '$name' },
    //           regex: search,
    //           options: 'i',
    //         },
    //       },
    //     },
    //   },
    //   {
    //     $sort: {
    //       createdAt: -1,
    //     },
    //   },
    //   {
    //     $facet: {
    //       total: [
    //         {
    //           $count: 'createdAt',
    //         },
    //       ],
    //       data: [
    //         {
    //           $addFields: {
    //             _id: '$_id',
    //           },
    //         },
    //       ],
    //     },
    //   },
    //   {
    //     $unwind: '$total',
    //   },
    //   {
    //     $project: {
    //       data: {
    //         $slice: [
    //           '$data',
    //           skip,
    //           {
    //             $ifNull: [limit, '$total.createdAt'],
    //           },
    //         ],
    //       },
    //       meta: {
    //         total: '$total.createdAt',
    //         limit: {
    //           $literal: limit,
    //         },
    //         page: {
    //           $literal: skip / limit + 1,
    //         },
    //         pages: {
    //           $ceil: {
    //             $divide: ['$total.createdAt', limit],
    //           },
    //         },
    //       },
    //     },
    //   },
    // ]);

    return result;
  }

  /*
    @desc      
        admin/subadmin signin        
        accept  email, password as an string
        return entire  object
  */
  async signinUser(email: string, password: string) {
    const result = await this.userModel.findOne({ email: email });
    if (!result) {
      throw new UnauthorizedException('Invalid Username ');
    }
    if (await result.matchPassword(password)) {
      return result;
    } else {
      throw new UnauthorizedException('Invalid  Password');
    }
  }

  /**
   *
   * @param query as an string for find user
   * @param currentUser as an string for skip current user
   * @returns top 5 list of users
   */
  async searchUser(query: string, currentUser: string) {
    const result = await this.userModel.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              {
                $eq: ['$status', true],
              },
              {
                $eq: ['$emailVerified', true],
              },
              {
                $eq: ['$isSubAdmin', false],
              },
              {
                $eq: ['$isAdmin', false],
              },
              {
                $ne: ['$_id', currentUser],
              },
            ],
          },
        },
      },
      {
        $match: {
          $expr: {
            $regexMatch: {
              input: '$name',
              regex: query,
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
        $limit: 5,
      },
      {
        $project: {
          name: 1,
          _id: 1,
        },
      },
    ]);
    return result;
  }
}
