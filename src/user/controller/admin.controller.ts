import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Get,
  Put,
  UseFilters,
  UseGuards,
  Request,
  UseInterceptors,
  ForbiddenException,
  Res,
  BadGatewayException,
  Query,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiSecurity,
  ApiQuery,
} from "@nestjs/swagger";
import { Model } from "mongoose";
import { Response } from "express";
import { HttpExceptionFilter } from "src/auth/exceptions/http.exception.filter";
import { AuthService } from "src/auth/services/auth.service";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";
import { LocalAuthGuard } from "src/auth/guard/local-auth.guard";
import { user } from "../interfaces/user.interface";
import { UserService } from "../services/user.service";
import { LoggingInterceptor } from "src/auth/exceptions/logging.interceptor";
import { RecaptchaGuard } from "src/auth/strategy/v3.strategy";
import { throwError } from "rxjs";

@ApiTags("User crud")
@Controller("admin")
@UseInterceptors(new LoggingInterceptor())
@UseFilters(new HttpExceptionFilter())
export class AdminController {
  constructor(
    @InjectModel("user")
    private readonly userModel: Model<user>,
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  // /**
  //  * @description create subadmin
  //  * @param data name,email,phone,password
  //  * @returns created object
  //  */
  // // @UseGuards(JwtAuthGuard)
  // @Post('createSubAdmin')
  // @ApiOperation({ summary: 'create subadmin from this api' })
  // @ApiSecurity('bearer')
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       name: {
  //         type: 'string',
  //         example: 'Olive',
  //         description: 'this is user name *',
  //       },
  //       email: {
  //         type: 'string',
  //         example: 'olive@mailinator.com',
  //         description: 'this is user email *',
  //       },
  //       phone: {
  //         type: 'number',
  //         example: '7645768756',
  //         description: 'this is user phone *',
  //       },
  //       password: {
  //         type: 'string',
  //         example: 'thi@123P',
  //         description: 'this is user password *',
  //       },
  //     },
  //   },
  // })
  // @ApiResponse({
  //   status: 201,
  //   description: 'sub admin cretae',
  // })
  // @ApiResponse({
  //   status: 500,
  //   description: 'internal server error',
  // })
  // async createAdmin(
  //   @Body()
  //   data: { name: string; password: string; email: string; phone: number }, // body of our data
  // ): Promise<Object> {
  //   const newAdmin = await this.userService.insertUser(
  //     data.name,
  //     data.email,
  //     data.password,
  //     true, // for subadmin
  //     data.phone,
  //     null, //body for otp
  //   );

  //   return {
  //     successCode: 201,
  //     successMessage: 'Sub admin create success',
  //     list: {
  //       name: newAdmin.name,
  //       email: newAdmin.email,
  //     },
  //   };
  // }

  // /**
  //  * @description update subadmin
  //  * @param data id name, email,phone,status
  //  * @returns updated object
  //  */
  // // @UseGuards(JwtAuthGuard)
  // @ApiSecurity('bearer')
  // @Put('update-admin')
  // @ApiOperation({ summary: 'update subadmin from this api' })
  // @ApiSecurity('bearer')
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       id: {
  //         type: 'string',
  //         example: '62cd58da468d4f068ac65bb7',
  //         description: 'this is user unique id *',
  //       },
  //       name: {
  //         type: 'string',
  //         example: 'John',
  //         description: 'this is user name *',
  //       },
  //       email: {
  //         type: 'string',
  //         example: 'john@mailinator.com',
  //         description: 'this is user email *',
  //       },
  //       phone: {
  //         type: 'number',
  //         example: '8673456789',
  //         description: 'this is user phone *',
  //       },
  //       status: {
  //         type: 'boolean',
  //         example: 'true',
  //         description: 'this is user status *',
  //       },
  //     },
  //   },
  // })
  // @ApiResponse({
  //   status: 200,
  //   description: 'sub admin update',
  // })
  // @ApiResponse({
  //   status: 500,
  //   description: 'internal server error',
  // })
  // async updateAdmin(
  //   @Body()
  //   data: {
  //     id: string;
  //     name: string;
  //     email: string;
  //     phone: number;
  //     status: boolean;
  //   }, // body of our data
  // ): Promise<Object> {
  //   const getUser = await this.userService.updateUser(
  //     data.id,
  //     data.name,
  //     data.email,
  //     false,
  //     data.phone,
  //     data.status,
  //   );
  //   if (!getUser) {
  //     return throwError(() => new BadGatewayException('Some thing went wrong'));
  //   }
  //   return {
  //     successCode: 200,
  //     successMessage: 'admin update success',
  //     list: {
  //       name: getUser.name,
  //       email: getUser.email,
  //       phone: getUser.phone,
  //       status: getUser.status,
  //     },
  //   };
  // }

  // /**
  //  * @description get admin by id
  //  * @param adminId for get docs
  //  * @returns name, email,phone,
  //  */
  // // @UseInterceptors(NotFoundInterceptor)
  // @ApiSecurity('bearer')
  // // @UseGuards(JwtAuthGuard)
  // // @UseInterceptors(new LoggingInterceptor())
  // @UseFilters(new HttpExceptionFilter())
  // @Get('findAdmin/:adminId')
  // @ApiOperation({ summary: 'get subadmin from this api' })
  // @ApiSecurity('bearer')
  // @ApiParam({
  //   name: 'adminId',
  //   example: '62cd58da468d4f068ac65bb7',
  // })
  // @ApiResponse({
  //   status: 200,
  //   description: 'sub admin details by id',
  // })
  // @ApiResponse({
  //   status: 500,
  //   description: 'internal server error',
  // })
  // async getAdminById(@Param('adminId') adminId: string): Promise<Object> {
  //   const getUser = await this.userService.getUserById(adminId);
  //   if (!getUser) {
  //     throw new ForbiddenException();
  //   }
  //   return {
  //     successCode: 200,
  //     successMessage: 'sub admin details',
  //     list: {
  //       name: getUser.name,
  //       email: getUser.email,
  //       phone: getUser.phone,
  //     },
  //   };
  // }

  // /**
  //  * @description get all admin list
  //  * @returns admin list
  //  */
  // @ApiSecurity('bearer')
  // // @UseGuards(JwtAuthGuard)
  // @Get('adminlist')
  // @ApiOperation({ summary: 'get all subadmin from this api' })
  // @ApiSecurity('bearer')
  // @ApiResponse({
  //   status: 200,
  //   description: 'get all sub admin ',
  // })
  // @ApiResponse({
  //   status: 500,
  //   description: 'Something went wrong',
  // })
  // async getAllAdmin(
  //   @Query('pageSize') pageSize: number,
  //   @Query('newPage') newPage: number,
  //   @Query('searchKey') searchKey: string,
  // ): Promise<Object> {
  //   const pagination = {
  //     page: newPage || 1,
  //     size: pageSize || 10,
  //     searchKey: searchKey || '',
  //   };
  //   const newAdmin = await this.userService.getAllUsers(
  //     pagination.page,
  //     pagination.size,
  //     pagination.searchKey,
  //   );

  //   return {
  //     successCode: 200,
  //     successMessage: 'Admin list',
  //     list: newAdmin,
  //   };
  // }

  // /**
  //  * @description admin signin
  //  * @param req auth admin
  //  * @returns token
  //  */
  // @UseGuards(RecaptchaGuard, LocalAuthGuard)
  // @Post('signin')
  // @ApiOperation({ summary: 'admin login from this api' })
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       username: {
  //         type: 'string',
  //         example: 'admin@thip.com',
  //         description: 'this is user email *',
  //       },
  //       password: {
  //         type: 'password',
  //         example: 'thi@123P',
  //         description: 'this is user password *',
  //       },
  //       token: {
  //         type: 'string',
  //         example: 'swagger_test_v3',
  //         description: 'this is v3 token *',
  //       },
  //     },
  //   },
  // })
  // @ApiResponse({
  //   status: 200,
  //   description: 'signin success ',
  // })
  // @ApiResponse({
  //   status: 401,
  //   description: 'Unauthorized',
  // })
  // @ApiResponse({
  //   status: 500,
  //   description: 'Something went wrong',
  // })
  // async signinAdmin(
  //   @Request() req,
  //   @Res({ passthrough: true }) res: Response,
  //   @Body() data: { password: string; email: string }, // body of our data
  // ): Promise<Object> {
  //   const user = await this.authService.login(req.user);
  //   console.log('created-token:=', user.access_token);
  //   res.cookie('auth-cookie', user.access_token);
  //   return {
  //     successCode: 200,
  //     successMesssgae: 'login success',
  //     accessToken: user.access_token,
  //   };
  // }

  /**
   * @description create user
   * @param data name password email phone
   * @returns name, email
   */

  // @ApiSecurity('bearer')
  // @UseGuards(JwtAuthGuard)
  @Post("create-user")
  @ApiOperation({ summary: "create user from this api" })
  // @ApiSecurity('bearer')
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        name: {
          type: "string",
          example: "any",
          description: "this is user name *",
        },
        email: {
          type: "string",
          example: "any",
          description: "this is user email *",
        },
        phone: {
          type: "number",
          example: "any",
          description: "this is user phone *",
        },
        password: {
          type: "string",
          example: "any",
          description: "this is user password *",
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: "user create",
  })
  @ApiResponse({
    status: 500,
    description: "internal server error",
  })
  async createUser(
    @Body()
    data: { name: string; password: string; email: string; phone: number } // body of our data
  ): Promise<Object> {
    const newUser = await this.userService.insertUser(
      data.name,
      data.email,
      data.password,
      false, //true for subadmin
      data.phone,
      null
    );

    return {
      successCode: 201,
      successMessage: "User create success",
      list: newUser,
    };
  }

  /*
    @desc
      put request
      update new user
      secured by admin
      accept id,name email,password as an string
  */
  // @ApiSecurity('bearer')
  // @UseGuards(JwtAuthGuard)
  @Put("update-user")
  @ApiOperation({ summary: "update user from this api" })
  // @ApiSecurity('bearer')
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          example: "any",
          description: "this is user id *",
        },
        name: {
          type: "string",
          example: "any",
          description: "this is user name *",
        },
        email: {
          type: "string",
          example: "any",
          description: "this is user email *",
        },
        phone: {
          type: "number",
          example: "any",
          description: "this is user phone *",
        },
        password: {
          type: "string",
          example: "any",
          description: "this is user password *",
        },
        status: {
          type: "boolean",
          example: true,
          description: "this is user status *",
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: "user update",
  })
  @ApiResponse({
    status: 500,
    description: "internal server error",
  })
  async updateUser(
    @Body()
    data: {
      id: string;
      name: string;
      password: string;
      email: string;
      phone: number;
      status: boolean;
    } // body of our data
  ): Promise<Object> {
    const newUser = await this.userService.updateUser(
      data.id,
      data.name,
      data.email,
      // data.password,
      false,
      data.phone,
      data.status
    );

    return {
      successCode: 200,
      successMessage: "User update success",
      list: newUser,
    };
  }

  /*
    @desc
      get request
      get  user by id
      secured by admin
      accept id,name email,password as an string
  */
  // @ApiSecurity('bearer')
  // @UseGuards(JwtAuthGuard)
  @Get("user/:userId")
  @ApiOperation({ summary: "get user by id from this api" })
  @ApiParam({
    name: "userId",
    example: "any",
  })
  @ApiResponse({
    status: 200,
    description: "user details",
  })
  @ApiResponse({
    status: 403,
    description: "id field are required",
  })
  async getUserById(@Param("userId") userId: string): Promise<Object> {
    const newUser = await this.userService.getUserById(userId);

    return {
      successCode: 200,
      successMessage: "User details",
      list: newUser,
    };
  }

  /*
    @desc
      get request
      get all  user 
      secured by admin
      
  */
  // @ApiSecurity('bearer')
  // @UseGuards(JwtAuthGuard)
  @Get("users")
  @ApiOperation({ summary: "get user  list from this api" })
  @ApiResponse({
    status: 200,
    description: "user list",
  })
  @ApiResponse({
    status: 500,
    description: "server error",
  })
  async getAllUsers(): // @Query('pageSize') pageSize: number,
  // @Query('newPage') newPage: number,
  // @Query('searchKey') searchKey: string,
  Promise<Object> {
    // const pagination = {
    //   page: newPage || 1,
    //   size: pageSize || 10,
    //   searchKey: searchKey || '',
    // };
    const newUser = await this.userService
      .getAllUsers
      // pagination.page,
      // pagination.size,
      // pagination.searchKey,
      ();

    return {
      successCode: 200,
      successMessage: "User list",
      list: newUser,
    };
  }

  // /**
  //  * @description search user by name
  //  * @param req search as an query for search user
  //  * @returns top 5 search result
  //  */
  // @ApiSecurity('bearer')
  // @UseGuards(JwtAuthGuard)
  // @Get('searchUser')
  // @ApiOperation({ summary: 'get user search based list from this api' })
  // @ApiQuery({
  //   name: 'search',
  //   example: 'any',
  // })
  // @ApiResponse({
  //   status: 200,
  //   description: 'user list',
  // })
  // @ApiResponse({
  //   status: 500,
  //   description: 'server error',
  // })
  // async searchUserForRelation(@Request() req): Promise<Object> {
  //   const getUser = await this.userService.searchUser(
  //     req.query.search,
  //     req.user._id,
  //   );
  //   return {
  //     successCode: 200,
  //     successMessage: 'User search list',
  //     list: getUser,
  //   };
  // }
}
