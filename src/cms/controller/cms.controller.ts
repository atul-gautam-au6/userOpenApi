import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Res,
  Response,
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
import { CmsService } from '../service/cms.service';
import { cms } from '../interface/cms.interface';
import { HttpExceptionFilter } from 'src/auth/exceptions/http.exception.filter';
import { LoggingInterceptor } from 'src/auth/exceptions/logging.interceptor';

@ApiTags('cms')
@ApiSecurity('bearer')
// @UseGuards(JwtAuthGuard)
@UseFilters(new HttpExceptionFilter())
@UseInterceptors(new LoggingInterceptor())
@Controller('cms')
export class CmsController {
  constructor(
    @InjectModel('cms')
    private readonly cmsModel: Model<cms>,

    private cmsService: CmsService,
  ) {}

  /**
   *
   * @param res 403 all field required
   * @param data  name , status accept as an string value
   * @returns created object
   */
  @Post('createCms')
  @ApiOperation({ summary: 'create cms page from this api' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'any',
          description: 'this is cms page name*',
        },
        description: {
          type: 'string',
          example: 'any',
          description: 'this is cms page description*',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'cms create',
  })
  @ApiResponse({
    status: 403,
    description: 'All field are required',
  })
  async createCms(
    // @res() res,
    @Body()
    data: {
      name: string;
      description: string;
    },
  ): Promise<Object> {
    const newCms = await this.cmsService.insertCms(data.name, data.description);

    return {
      successCode: 201,
      successMessage: 'cms create sucess',
      list: newCms,
    };
  }

  /**
   * @description update cms
   * @param res 403 id is required
   * @param data id,name,description,status
   * @returns updated object
   */
  @Put('updateCms')
  @ApiOperation({ summary: 'update cms page from this api' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: 'any',
          description: 'this is cms page id*',
        },
        name: {
          type: 'string',
          example: 'any',
          description: 'this is cms page name*',
        },
        description: {
          type: 'string',
          example: 'any',
          description: 'this is cms page description*',
        },
        status: {
          type: 'boolean',
          example: true,
          description: 'this is cms page status*',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'cms update',
  })
  @ApiResponse({
    status: 204,
    description: 'id field are required',
  })
  async updateCms(
    // @Res() res,
    @Body()
    data: {
      id: string;
      name: string;
      description: string;
      status: boolean;
    },
  ): Promise<Object> {
    // if (!data.id) {
    //   return res.status(403).json({
    //     errorCode: 403,
    //     errorMessage: 'id is  required',
    //   });
    // }
    const result = await this.cmsService.updateCms(
      data.id,
      data.name,
      data.description,
      data.status,
    );
    return {
      successCode: 200,
      successMessage: 'cms update',
      list: result,
    };
  }

  /**
   * @description get cms by id
   * @param res 403 id is required
   * @param id accept string
   * @returns find object
   */
  @Get('findOne/:id')
  @ApiOperation({ summary: 'get cms page by id from this api' })
  @ApiParam({
    name: 'id',
    example: 'any',
  })
  @ApiResponse({
    status: 200,
    description: 'cms detals',
  })
  @ApiResponse({
    status: 204,
    description: 'id is required',
  })
  async getCmsById(
    // @Res() res,
    @Param('id') id: string,
  ): Promise<Object> {
    // if (!id) {
    //   return res.status(403).json({
    //     errorCode: 403,
    //     errorMessgae: 'id is required',
    //   });
    // }
    const result = await this.cmsService.getCmsById(id);

    return {
      successCode: 200,
      successMessage: 'cms details',
      list: result,
    };
  }

  /**
   * @description get all cms list
   * @returns cms list
   */
  @ApiOperation({ summary: 'get all cms list from this api' })
  @ApiSecurity('bearer')
  @ApiResponse({
    status: 200,
    description: 'get all cms ',
  })
  @ApiResponse({
    status: 500,
    description: 'Something went wrong',
  })
  @Get('findAll/cms')
  async getAllCms(): Promise<Object> {
    const pagination = { page: 1, size: 10, searchKey: '' };
    const result = await this.cmsService.getAllCms(
      pagination.page,
      pagination.size,
      pagination.searchKey,
    );
    // console.log(result);
    return {
      successCode: 200,
      successMessage: 'cms list',
      list: result,
    };
  }
}
