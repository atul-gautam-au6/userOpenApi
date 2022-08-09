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
import { TreatmentService } from '../services/treatment.service';

@ApiTags('master-setting')
@Controller('admin')
export class TreatmentController {
  constructor(private readonly TreatmentService: TreatmentService) {}
  @Post('createTreatment')
  @ApiOperation({ summary: 'create Treatment in this Api' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        TreatmentName: {
          type: 'string',
          example: 'go for tests',
          description: 'this is the Treatment name',
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
    description: 'Treatment Added',
  })
  @ApiResponse({
    status: 400,
    description: 'Treatment Name is Mandatory',
  })
  async createTreatment(
    @Body() data: { TreatmentName: string; status: boolean },
  ): Promise<Object> {
    console.log(data.TreatmentName, 'medical condtion Name');
    if (!data.TreatmentName) {
      return {
        errorCode: 403,
        message: 'Treatment Name is Mandatory',
      };
    }
    const newTreatment = await this.TreatmentService.insertTreatment(
      data.TreatmentName,
      data.status,
    );

    console.log(newTreatment, 'new Medical condito ');
    return {
      successCode: 201,
      message: 'Treatment Created Scucessfully',
      list: newTreatment,
    };
  }
  @Get('getTreatments/getAll')
  async getAllTreatments(
    @Query('pageSize') pageSize: number,
    @Query('newPage') newPage: number,
  ): Promise<Object> {
    const pageOptions = {
      page: newPage || 1,
      size: pageSize || 10,
    };
    const treatmentList = await this.TreatmentService.getAllTreatments(
      pageOptions.page,
      pageOptions.size,
    );
    if (!treatmentList) {
      return {
        successCode: 400,
        message: 'No Treatments Found',
      };
    }

    return {
      successCode: 200,
      data: treatmentList,
    };
  }

  @Patch('updateTreatment')
  @ApiOperation({ summary: 'update Treatment from this api' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
        },
        TreatmentName: {
          type: 'string',
          example: 'better',
          description: 'enter Treatment Name',
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
    description: 'Treatment Updated',
  })
  @ApiResponse({
    status: 403,
    description: 'id field is required',
  })
  async updateTreatment(
    @Body()
    data: {
      id: string;
      TreatmentName: string;
      status: boolean;
    },
  ) {
    const updatedTreatment = await this.TreatmentService.updateTreatment(
      data.id,
      data.TreatmentName,
      data.status,
    );
    return {
      successCode: 200,
      message: 'Treatment updated',
      data: updatedTreatment,
    };
  }
  @Get('treatment/:Id')
  @ApiOperation({ summary: 'get treatment by id from this api' })
  @ApiParam({
    name: 'Id',
    example: 'any',
  })
  @ApiResponse({
    status: 200,
    description: 'treatmetn details',
  })
  @ApiResponse({
    status: 403,
    description: 'id field are required',
  })
  async getTreatmentById(@Param('Id') Id: string): Promise<Object> {
    const getTreatment = await this.TreatmentService.getTreatmentByid(Id);
    return {
      successCode: 200,
      successMessage: 'Treatment  details',
      list: getTreatment,
    };
  }
}
