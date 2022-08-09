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
import { criticalmedicalconditionSevice } from '../services/criticalmedicalcondition.service';

@ApiTags('master-setting')
@Controller('admin')
export class CriticalMedicalConditionController {
  constructor(
    private readonly criticalMedicalConditonService: criticalmedicalconditionSevice,
  ) {}
  @Post('createCriticalMedicalCondition')
  @ApiOperation({ summary: 'create medical Condition in this Api' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        MedicalConditionName: {
          type: 'string',
          example: 'fever',
          description: 'this is the medical condtion',
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
    description: 'Medical Condition Added',
  })
  @ApiResponse({
    status: 400,
    description: 'Medical condtion Name is required',
  })
  async createMedicalCondition(
    @Body() data: { MedicalConditionName: string; status: boolean },
  ): Promise<Object> {
    console.log(data.MedicalConditionName, 'medical condtion Name');
    if (!data.MedicalConditionName) {
      return {
        errorCode: 403,
        message: 'Please Enter Medical Condtion',
      };
    }
    const newMedicalcondition =
      await this.criticalMedicalConditonService.insertCriticalMedicalCondition(
        data.MedicalConditionName,
        data.status,
      );

    console.log(newMedicalcondition, 'new Medical condito ');
    return {
      successCode: 201,
      message: 'Medical condition Created Scucessfully',
      list: newMedicalcondition,
    };
  }
  @Get('getCriticalMedicalCondition/getAll')
  async getAllCriticalMedicalCondition(
    @Query('pageSize') pageSize: number,
    @Query('newPage') newPage: number,
  ): Promise<Object> {
    const pageOptions = {
      page: newPage || 1,
      size: pageSize || 10,
    };
    const criticalMedicalConditionList =
      await this.criticalMedicalConditonService.getAllCriticalMedicalCondition(
        pageOptions.page,
        pageOptions.size,
      );
    if (!criticalMedicalConditionList) {
      return {
        successCode: 400,
        message: 'No Medical Condtions Found',
      };
    }

    return {
      successCode: 200,
      data: criticalMedicalConditionList,
    };
  }

  @Patch('updateCriticalMedicalCondition')
  @ApiOperation({ summary: 'update Critcal Medical Condition from this api' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
        },
        MedicalConditionName: {
          type: 'string',
          example: 'fever/any',
          description: 'enter medical condition Name',
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
    description: 'Medical Critical condition Update',
  })
  @ApiResponse({
    status: 403,
    description: 'id field is required',
  })
  async updateCriticalMedicalCondition(
    @Body()
    data: {
      id: string;
      MedicalConditionName: string;
      status: boolean;
    },
  ) {
    const updatedCriticalMedicalcondtion =
      await this.criticalMedicalConditonService.updateMedicalCondition(
        data.id,
        data.MedicalConditionName,
        data.status,
      );
    return {
      successCode: 200,
      message: 'Medical condition updated',
      data: updatedCriticalMedicalcondtion,
    };
  }
  @Get('criticalMedicalcondition/:Id')
  @ApiOperation({
    summary: 'get critical medical condiiton by id from this api',
  })
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
  async getCriticalMedicalconditionById(
    @Param('Id') Id: string,
  ): Promise<Object> {
    const getCriticalMedicalCondition =
      await this.criticalMedicalConditonService.getCriticalMedicalConditionByid(
        Id,
      );
    return {
      successCode: 200,
      successMessage: 'Critical history  detail',
      list: getCriticalMedicalCondition,
    };
  }
}
