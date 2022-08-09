import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { Model } from 'mongoose';
import { HttpExceptionFilter } from 'src/auth/exceptions/http.exception.filter';
import { LoggingInterceptor } from 'src/auth/exceptions/logging.interceptor';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { logo } from '../interface/logo.interface';
import { LogoService } from '../services/logo.service';

@ApiTags('master-setting')
@ApiSecurity('bearer')
// @UseGuards(JwtAuthGuard)
@UseFilters(new HttpExceptionFilter())
@UseInterceptors(new LoggingInterceptor())
@Controller('logo')
export class LogoController {
  constructor(
    @InjectModel('logo')
    private readonly logoModel: Model<logo>,
    private readonly logoService: LogoService,
  ) {}

  /*
    @desc
        post request
        create logo
        secured by admin
        accept logo and status
  */
  @Post('createLogo')
  @ApiOperation({ summary: 'create logo from this api' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        logo: {
          type: 'string',
          format: 'binary',
          description: 'this is logo image url *',
        },

        status: {
          type: 'boolean',
          example: true,
          description: 'this is logo status *',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'logo create',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @UseInterceptors(
    FileInterceptor('logo', {
      dest: 'client/logo/',
      limits: {
        fieldSize: 10 * 1024 * 1024,
      },
    }),
  )
  async createLogo(
    @UploadedFile() file,
    @Body()
    data: {
      logo: string;
      status: boolean;
    },
  ): Promise<Object> {
    if (!file?.filename) {
      return {
        errorCode: 500,
        errorMessage: 'logo is required*',
      };
    }
    const newLogo = await this.logoService.insertLogo(
      file?.filename,
      data.status,
    );
    return {
      successCode: 201,
      successMessage: 'logo create success',
      list: newLogo,
    };
  }

  /*
    @desc
        put request
        create logo
        secured by admin
        accept logo and status
  */
  @Put('/updateLogo')
  @ApiOperation({ summary: 'update logo from this api' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: 'any',
          description: 'this is logo id*',
        },
        logo: {
          type: 'string',
          format: 'binary',
          description: 'this is logo image url *',
        },

        status: {
          type: 'boolean',
          example: true,
          description: 'this is logo status *',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'logo update',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @UseInterceptors(
    FileInterceptor('logo', {
      dest: 'client/logo/',
      limits: {
        fieldSize: 10 * 1024 * 1024,
      },
    }),
  )
  async updateLogo(
    @UploadedFile() file,
    @Body()
    data: {
      id: string;
      logo: string;
      status: boolean;
    },
  ): Promise<Object> {
    if (!data.id) {
      return {
        errorCode: 500,
        errorMessage: 'logo id is required for update*',
      };
    }
    const updateLogo = await this.logoService.updateLogo(
      data.id,
      file?.filename,
      data.status,
    );
    return {
      successCode: 200,
      successMessage: 'logo update success',
      list: updateLogo,
    };
  }

  /*
    @desc
        get request
        get logo by id
        secured by admin
  */
  @Get('/getById/:logoId')
  @ApiOperation({ summary: 'get logo by id from this api' })
  @ApiParam({
    name: 'logoId',
    example: 'any',
  })
  @ApiResponse({
    status: 200,
    description: 'logo details',
  })
  @ApiResponse({
    status: 403,
    description: 'id field are required',
  })
  async getLogoById(@Param('logoId') logoId: string): Promise<Object> {
    if (!logoId) {
      return {
        errorCode: 500,
        errorMessage: 'logo id is required*',
      };
    }
    const getLogo = await this.logoService.getLogoById(logoId);
    return {
      successCode: 200,
      successMessage: 'logo details',
      list: getLogo,
    };
  }

  /*
    @desc
        get request
        get all logo
        secured by admin
  */
  @Get('logos')
  @ApiOperation({ summary: 'get all logo from this api' })
  @ApiResponse({
    status: 200,
    description: 'logo list',
  })
  @ApiResponse({
    status: 500,
    description: 'server error',
  })
  async getAllLogo(): Promise<Object> {
    const pagination = { page: 1, size: 10, searchKey: '' };

    const getLogo = await this.logoService.getAllLogo(
      pagination.page,
      pagination.size,
      pagination.searchKey,
    );
    return {
      successCode: 200,
      successMessage: 'all logo',
      list: getLogo,
    };
  }
}
