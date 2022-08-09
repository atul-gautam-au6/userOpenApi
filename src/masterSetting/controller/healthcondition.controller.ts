import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CriticalHistorySevice } from '../services/criticahistory.service';
import { criticalmedicalconditionSevice } from '../services/criticalmedicalcondition.service';
import { HealthConditionService } from '../services/healthcondition.service';

@ApiTags('master-setting')
@Controller('admin')
export class HealthConditionController {
  constructor(
    private readonly healthConditionService: HealthConditionService,
  ) {}
  @Post('createhealthCondition')
  @ApiOperation({ summary: 'create medical Condition in this Api' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        HealthCondition: {
          type: 'string',
          example: 'fever',
          description: 'this is the Critical history',
        },
        status: {
          type: 'boolean',
          example: 'true/false',
        },
      },
    },
  })
  @ApiResponse({
    status: 202,
    description: 'Health condition Added',
  })
  @ApiResponse({
    status: 400,
    description: 'Health Condition is Mandatory',
  })
  async createHealthCondition(
    @Body() data: { HealthCondition: string; status: boolean },
  ): Promise<Object> {
    console.log(data.HealthCondition, 'medical condtion Name');
    if (!data.HealthCondition) {
      return {
        errorCode: 403,
        message: 'Health condition is Mandatory',
      };
    }
    const newHealthCondition =
      await this.healthConditionService.insertHealthCondition(
        data.HealthCondition,
        data.status,
      );

    console.log(newHealthCondition, 'new Medical condito ');
    return {
      successCode: 201,
      message: 'Health Created Scucessfully',
      list: newHealthCondition,
    };
  }
  @Get('getHealthCondition/getAll')
  async getAllHealthCondition(
    @Query('pageSize') pageSize: number,
    @Query('newPage') newPage: number,
  ): Promise<Object> {
    const pageOptions = {
      page: newPage || 1,
      size: pageSize || 10,
    };
    const healthConditionList =
      await this.healthConditionService.getAllHealthCondition(
        pageOptions.page,
        pageOptions.size,
      );
    if (!healthConditionList) {
      return {
        successCode: 400,
        message: 'No Health Condtions Found',
      };
    }

    return {
      successCode: 200,
      data: healthConditionList,
    };
  }

  @Patch('updateHealthCondition')
  @ApiOperation({ summary: 'update Health from this api' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
        },
        HealthCondition: {
          type: 'string',
          example: 'better',
          description: 'enter health condition',
        },
        status: {
          type: 'boolean',
          example: 'false',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Health condition Updated',
  })
  @ApiResponse({
    status: 403,
    description: 'id field is required',
  })
  async updateCriticalHistory(
    @Body()
    data: {
      id: string;
      HealthCondition: string;
      status: boolean;
    },
  ) {
    const updatedHealthcondition =
      await this.healthConditionService.updateCriticalHistory(
        data.id,
        data.HealthCondition,
        data.status,
      );
    return {
      successCode: 200,
      message: 'Health Condition updated',
      data: updatedHealthcondition,
    };
  }
  @Get('healthcondition/:Id')
  @ApiOperation({ summary: 'get health condition by id from this api' })
  @ApiParam({
    name: 'Id',
    example: 'any',
  })
  @ApiResponse({
    status: 200,
    description: 'critical Medical condition details',
  })
  @ApiResponse({
    status: 403,
    description: 'id field are required',
  })
  async getHealthconditionById(@Param('Id') Id: string): Promise<Object> {
    const getHealthCondition =
      await this.healthConditionService.getHealthConditionByid(Id);
    return {
      successCode: 200,
      successMessage: 'Health conditon retrieved',
      list: getHealthCondition,
    };
  }
}
