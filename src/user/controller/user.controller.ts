import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Request,
  Res,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { Model } from 'mongoose';
import { Response } from 'express';
import { HttpExceptionFilter } from 'src/auth/exceptions/http.exception.filter';
import { LocalAuthGuard } from 'src/auth/guard/local-auth.guard';
import { JwtUserGuard } from 'src/auth/guard/user-auth.guard';
import { AuthService } from 'src/auth/services/auth.service';
import { RecaptchaGuard } from 'src/auth/strategy/v3.strategy';
import { ResourcesService } from 'src/resources/resources.service';
import { user } from '../interfaces/user.interface';
import { UserService } from '../services/user.service';
import { LoggingInterceptor } from 'src/auth/exceptions/logging.interceptor';

@ApiTags('user')
@Controller('user')
@UseFilters(new HttpExceptionFilter())
@UseInterceptors(new LoggingInterceptor())
export class UserController {
  constructor(
    @InjectModel('user')
    private readonly userModel: Model<user>,
    private readonly userService: UserService, // private readonly authService: AuthServiceO,
    private readonly resourcesService: ResourcesService,
    private readonly authService: AuthService,
  ) {}

  /*
    @desc
      user signin api
      accept email and password as an string
  */
  @Post('signin')
  @UseGuards(RecaptchaGuard, LocalAuthGuard)
  @ApiOperation({ summary: 'user login from this api' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          example: 'any',
          description: 'this is user email *',
        },
        password: {
          type: 'password',
          example: 'thi@123P',
          description: 'this is user password *',
        },
        token: {
          type: 'string',
          example: 'swagger_test_v3',
          description: 'this is v3 token *',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'signin success ',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 500,
    description: 'Something went wrong',
  })
  async signinUser(
    @Request() req,
    @Res({ passthrough: true }) res: Response,
    @Body() data: { password: string; email: string },
  ): Promise<Object> {
    const user = await this.authService.login(req.user);

    res.cookie('auth-cookie', user.access_token, { httpOnly: true });
    return {
      successCode: 200,
      successMesssgae: 'login success',
    };
  }

  /*
    @desc
      user signup api
      accept name email password phone
      get request
  */

  @Post('signup')
  @ApiOperation({ summary: 'signup user from this api' })
  @ApiSecurity('bearer')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'atul',
          description: 'this is user name *',
        },
        email: {
          type: 'string',
          example: 'atul.vayuz@gmail.com',
          description: 'this is user email *',
        },
        phone: {
          type: 'number',
          example: '7389204063',
          description: 'this is user phone *',
        },
        password: {
          type: 'string',
          example: 'atul12345@G',
          description: 'this is user password *',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'user signin success ',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async userSignup(
    @Body()
    data: {
      name: string;
      email: string;
      password: string;
      phone: number;
    },
  ): Promise<Object> {
    const otp = await this.resourcesService.generateNotification();
    const newUser = await this.userService.insertUser(
      data.name,
      data.email,
      data.password,
      false,
      data.phone,
      Number(otp),
    );

    this.resourcesService.sendMail({
      to: 'atul.vayuz@gmail.com',
      subject: 'THIP | Otp verification',
      html: await this.resourcesService.otpService(Number(otp)),
    });

    return {
      successCode: 201,
      successMessage: 'user create success',
    };
  }

  /**
   * @description otp verification
   * @param Req post
   * @argument Body email , otp
   * @returns object
   */

  @Put('otpVerification')
  @ApiOperation({ summary: 'signup user otp verification from this api' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          example: 'atul.vayuz@gmail.com',
          description: 'this is user email *',
        },
        otp: {
          type: 'number',
          example: 1234,
          description: 'this is otp *',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'user verification  success ',
  })
  @ApiResponse({
    status: 401,
    description: 'invalid otp',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async otpVerification(
    @Res() res,
    @Body()
    data: {
      email: string;
      otp: number;
    },
  ): Promise<Object> {
    const getUser = await this.userService.getUserByEmail(data.email);
    if (!getUser) {
      return res.status(401).json({
        errorCode: 401,
        errorMessage: 'user not found',
      });
    } 
    // else if (getUser.otp === data.otp) {
    //   const updatedUser = await this.userService.successVerification(
    //     getUser._id,
    //   );

    //   const user = await this.authService.login(getUser);

    //   res.cookie('auth-cookie', user.access_token, { httpOnly: true });

    //   return {
    //     successCode: 200,
    //     SuccessMessage: 'Verified',
    //   };
    // } 
    else {
      return res.status(401).json({
        errorCode: 401,
        errorMessage: 'otp not match',
      });
    }
  }

  @ApiSecurity('bearer')
  @UseGuards(JwtUserGuard)
  @Get('myProfile')
  @ApiOperation({ summary: 'my (user) profile from this api' })
  async myProfile(@Request() Req): Promise<Object> {
    const newUser = await this.userService.getUserById(Req.user.id);

    return {
      successCode: 200,
      successMessage: 'User profile ',
      list: newUser,
    };
  }
}
