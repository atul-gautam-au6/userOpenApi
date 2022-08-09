import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { CriticalHistorySevice } from "../services/criticahistory.service";
import { criticalmedicalconditionSevice } from "../services/criticalmedicalcondition.service";

@ApiTags("master-setting")
@Controller("admin")
export class CriticalHistoryController {
  constructor(private readonly criticalHsitoryService: CriticalHistorySevice) {}
  @Post("createCriticalHistory")
  @ApiOperation({ summary: "create medical Condition in this Api" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        CriticalHistory: {
          type: "string",
          example: "fever",
          description: "this is the Critical history",
        },
        status: {
          type: "boolean",
          example: "true/false",
        },
      },
    },
  })
  @ApiResponse({
    status: 202,
    description: "Criitcal History Added",
  })
  @ApiResponse({
    status: 400,
    description: "Critical history is Mandatory",
  })
  async createCriticalHistory(
    @Body() data: { CriticalHistory: string; status: boolean }
  ): Promise<Object> {
    console.log(data.CriticalHistory, "medical condtion Name");
    if (!data.CriticalHistory) {
      return {
        errorCode: 403,
        message: "Critical history is Mandatory",
      };
    }
    const newCriticalHistory =
      await this.criticalHsitoryService.insertCriticalHistory(
        data.CriticalHistory,
        data.status
      );

    console.log(newCriticalHistory, "new Medical condito ");
    return {
      successCode: 201,
      message: "Critical history Created Scucessfully",
      list: newCriticalHistory,
    };
  }
  @Get("getCriticalHistory/getAll")
  async getAllCriticalHistory(
    @Query("pageSize") pageSize: number,
    @Query("newPage") newPage: number
  ): Promise<Object> {
    const pageOptions = {
      page: newPage || 1,
      size: pageSize || 10,
    };
    const criticalHistoryList =
      await this.criticalHsitoryService.getAllCriticalHistory(
        pageOptions.page,
        pageOptions.size
      );
    if (!criticalHistoryList) {
      return {
        successCode: 400,
        message: "No Medical Condtions Found",
      };
    }

    return {
      successCode: 200,
      data: criticalHistoryList,
    };
  }

  @Patch("updateCriticalHistory")
  @ApiOperation({ summary: "update Critcal History from this api" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        id: {
          type: "string",
        },
        CriticalHistory: {
          type: "string",
          example: "fever/any",
          description: "enter medical condition Name",
        },
        status: {
          type: "boolean",
          example: "false",
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: "Critical History Updated",
  })
  @ApiResponse({
    status: 403,
    description: "id field is required",
  })
  async updateCriticalHistory(
    @Body()
    data: {
      id: string;
      CriticalHistory: string;
      status: boolean;
    }
  ) {
    const updatedCriticalHistory =
      await this.criticalHsitoryService.updateCriticalHistory(
        data.id,
        data.CriticalHistory,
        data.status
      );
    return {
      successCode: 200,
      message: "Medical History updated",
      data: updatedCriticalHistory,
    };
  }
  @Get("criticalHistory/:Id")
  @ApiOperation({ summary: "get Critical history by id from this api" })
  @ApiParam({
    name: "Id",
    example: "any",
  })
  @ApiResponse({
    status: 200,
    description: "critical history details",
  })
  @ApiResponse({
    status: 403,
    description: "id field are required",
  })
  async getCriticalHistoryById(@Param("Id") Id: string): Promise<Object> {
    const getCriticalHistory =
      await this.criticalHsitoryService.getCriticalHistoryByid(Id);
    return {
      successCode: 200,
      successMessage: "Critical history  detail",
      list: getCriticalHistory,
    };
  }
}
