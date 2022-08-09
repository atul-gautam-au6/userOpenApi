import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { Model } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { SpecializationService } from '../services/specialization.service';
import { specialization } from '../interface/specialization.interface';
import { HttpExceptionFilter } from 'src/auth/exceptions/http.exception.filter';
import { LoggingInterceptor } from 'src/auth/exceptions/logging.interceptor';

@ApiTags('master-setting')
@ApiSecurity('bearer')
// @UseGuards(JwtAuthGuard)
@UseFilters(new HttpExceptionFilter())
@UseInterceptors(new LoggingInterceptor())
@Controller('admin')
export class SpecializationController {
  constructor(
    @InjectModel('specialization')
    private readonly specializationModel: Model<specialization>,
    private readonly SpecializationService: SpecializationService,
  ) {}

  /**
   * @description create new specialization
   * @param data {name:string,status:boolean}
   * @returns created object
   */
  @Post('createSpecialization')
  @ApiOperation({ summary: 'create specialization  from this api' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'any',
          description: 'this is specialization name*',
        },
        status: {
          type: 'booelan',
          example: true,
          description: 'this is status of specialization*',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'specialization create',
  })
  @ApiResponse({
    status: 403,
    description: 'All field are required',
  })
  async createSpecialization(
    @Body()
    data: {
      name: string;
      status: boolean;
    },
  ): Promise<Object> {
    if (!data.name || !data.status) {
      return {
        errorCode: 403,
        errorMessage: 'Name and status fields are required*',
      };
    }
    const newSpecialization =
      await this.SpecializationService.insertSpecialization(
        data.name,
        data.status, //optional
      );
    return {
      successCode: 201,
      successMessage: 'specialization create success',
      list: newSpecialization,
    };
  }

  /**
   * @description update specialization
   * @param data {id:mongo id,name:string,status:boolean}
   * @returns updated object
   */
  @Put('updateSpecilalization')
  @ApiOperation({ summary: 'update specialization from this api' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: 'any',
          description: 'this is your specialization',
        },
        name: {
          type: 'string',
          example: 'any',
          description: 'this is specialization name*',
        },
        status: {
          type: 'boolean',
          example: true,
          description: 'this is status of specialization*',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'specialization update',
  })
  @ApiResponse({
    status: 403,
    description: 'id field is required',
  })
  async updateSpecialization(
    @Body()
    data: {
      id: string;
      name: string;
      status: boolean;
    },
  ): Promise<Object> {
    const getSpecialization =
      await this.SpecializationService.updateSpecialization(
        data.id,
        data.name,
        data.status,
      );
    return {
      successCode: 200,
      successMessage: 'specialization update success',
      list: getSpecialization,
    };
  }

  /**
   * @description find specialization
   * @param specializationId id
   * @returns find object
   */
  @Get('specialization/findone/:specializationId')
  @ApiOperation({ summary: 'get specialization by id from this api' })
  @ApiParam({
    name: 'specializationId',
    example: 'any',
  })
  @ApiResponse({
    status: 200,
    description: 'specialization details',
  })
  @ApiResponse({
    status: 403,
    description: 'id field are required',
  })
  async getCategoryById(
    @Param('specializationId') specializationId: string,
  ): Promise<Object> {
    const getSpecialization =
      await this.SpecializationService.getSpecializationByid(specializationId);
    return {
      successCode: 200,
      successMessage: 'specialization details ',
      list: getSpecialization,
    };
  }

  /**
   * @description find all specialization
   * @param pageSize size of page
   * @param newPage current page
   * @returns find object an array
   */
  @Get('specialization/getAll')
  async getAllspecialization(
    @Query('pageSize') pageSize: number,
    @Query('newPage') newPage: number,
  ): Promise<Object> {
    const pagination = {
      page: newPage || 1,
      size: pageSize || 10,
      searchKey: '',
    };
    const result = await this.SpecializationService.getAllSpecialization(
      pagination.page,
      pagination.size,
      pagination.searchKey,
    );
    return {
      successCod: 200,
      successMessage: 'all specialization list',
      list: result,
    };
  }
}
