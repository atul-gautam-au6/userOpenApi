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

import { MedicinesService } from '../services/medicines.service';

@ApiTags('master-setting')
@Controller('admin')
export class MedicineController {
  constructor(private readonly MedicineService: MedicinesService) {}
  @Post('createMedicine')
  @ApiOperation({ summary: 'create Medicine in this Api' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        MedicineName: {
          type: 'string',
          example: 'Paracetemol',
          description: 'this is the Medicine name',
        },
        Manufacturer: {
          type: 'string',
          example: 'Farmson',
          description: 'Enter the manufacturer name of the medicine',
        },

        Salt: {
          type: 'string',
          example: 'enter the salt name here',
          description: '',
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
    description: 'Medicine Added',
  })
  @ApiResponse({
    status: 400,
    description: 'Fields are  Mandatory',
  })
  async createMedicine(
    @Body()
    data: {
      MedicineName: string;
      Manufacturer: string;
      Salt: string;
      status: boolean;
    },
  ): Promise<Object> {
    console.log(data.MedicineName, 'medical condtion Name');
    if (!data.MedicineName) {
      return {
        errorCode: 403,
        message: 'Medicine Name is Mandatory',
      };
    }
    if (!data.Manufacturer) {
      return {
        errorCode: 403,
        message: 'Manufacturer Name is Mandatory',
      };
    }
    if (!data.Salt) {
      return {
        errorCode: 403,
        message: 'Salt Name is Mandatory',
      };
    }

    const newMedicine = await this.MedicineService.insertMedicine(
      data.MedicineName,
      data.Manufacturer,
      data.Salt,
      data.status,
    );

    console.log(newMedicine, 'new Medical condito ');
    return {
      successCode: 201,
      message: 'Medicine Created Scucessfully',
      list: newMedicine,
    };
  }
  @Get('getMedicines/getAll')
  async getAllMedicines(
    @Query('pageSize') pageSize: number,
    @Query('newPage') newPage: number,
  ): Promise<Object> {
    const pageOptions = {
      page: newPage || 1,
      size: pageSize || 10,
    };
    const medicineList = await this.MedicineService.getAllMedicines(
      pageOptions.page,
      pageOptions.size,
    );
    if (!medicineList) {
      return {
        successCode: 400,
        message: 'No Medicines Found',
      };
    }

    return {
      successCode: 200,
      data: medicineList,
    };
  }

  @Patch('updateMedicine')
  @ApiOperation({ summary: 'update Medicine from this api' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
        },
        MedicineName: {
          type: 'string',
          example: 'Paracetemol',
          description: 'this is the Medicine name',
        },
        Manufacturer: {
          type: 'string',
          example: 'Farmson',
          description: 'Enter the manufacturer name of the medicine',
        },

        Salt: {
          type: 'string',
          example: 'enter the salt name here',
          description: '',
        },
        status: {
          type: 'boolean',
          example: 'true/false',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Medicine Updated',
  })
  @ApiResponse({
    status: 403,
    description: 'id field is required',
  })
  async updateMedicine(
    @Body()
    data: {
      id: string;
      MedicineName: string;
      Manufacturer: string;
      Salt: string;
      status: boolean;
    },
  ) {
    const updatedMedicine = await this.MedicineService.updateMedicine(
      data.id,
      data.MedicineName,
      data.Manufacturer,
      data.Salt,
      data.status,
    );
    return {
      successCode: 200,
      message: 'Medicine updated',
      data: updatedMedicine,
    };
  }
  @Get('medicine/:Id')
  @ApiOperation({ summary: 'get medicine by id from this api' })
  @ApiParam({
    name: 'Id',
    example: 'any',
  })
  @ApiResponse({
    status: 200,
    description: 'Medicine details',
  })
  @ApiResponse({
    status: 403,
    description: 'id field are required',
  })
  async getMedicineById(@Param('Id') Id: string): Promise<Object> {
    const getMedicine = await this.MedicineService.getMedicineByid(Id);
    return {
      successCode: 200,
      successMessage: 'Medicine  details',
      list: getMedicine,
    };
  }
}
