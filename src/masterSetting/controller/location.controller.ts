import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Response,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from "@nestjs/swagger";
import { Model } from "mongoose";
import { HttpExceptionFilter } from "src/auth/exceptions/http.exception.filter";
import { LoggingInterceptor } from "src/auth/exceptions/logging.interceptor";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";
import { location } from "../interface/location.interface";
import { LocationService } from "../services/location.service";

@ApiTags("master-setting")
@ApiSecurity("bearer")
// @UseGuards(JwtAuthGuard)
@UseFilters(new HttpExceptionFilter())
@UseInterceptors(new LoggingInterceptor())
@Controller("admin/location")
export class LocationController {
  constructor(
    @InjectModel("location")
    private readonly locationModel: Model<location>,
    private readonly locationService: LocationService
  ) {}

  /**
   *
   * @param res 403 required all field
   * @param data state,city,pincode
   * @returns
   */
  @Post("createLocation")
  @ApiOperation({ summary: "create location from this api" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        state: {
          type: "string",
          example: "any",
          description: "this is state name*",
        },
        city: {
          type: "string",
          example: "any",
          description: "this is city name*",
        },
        pinCode: {
          type: "number",
          example: true,
          description: "this is pin code*",
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: "location create",
  })
  @ApiResponse({
    status: 403,
    description: "All field are required",
  })
  async createLocation(
    @Body()
    data: {
      state: string;
      city: string;
      pinCode: number;
    }
  ): Promise<Object> {
    const newLocation = await this.locationService.insertLocation(
      data.state,
      data.city,
      data.pinCode
    );

    return {
      successCode: 201,
      successMessage: "locaton create success",
      list: newLocation,
    };
  }

  /**
   *
   * @param data id,state,city,pincode,status
   * @returns updated object
   */
  @Put("updateLocation")
  @ApiOperation({ summary: "update location from this api" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          example: "any",
          description: "this is your location id",
        },
        state: {
          type: "string",
          example: "any",
          description: "this is state name*",
        },
        city: {
          type: "string",
          example: "any",
          description: "this is city name*",
        },
        pinCode: {
          type: "number",
          example: true,
          description: "this is pin code*",
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: "location create",
  })
  @ApiResponse({
    status: 403,
    description: "All field are required",
  })
  async updateLocation(
    @Body()
    data: {
      id: string;
      state: string;
      city: string;
      pinCode: number;
      status: boolean;
    }
  ): Promise<Object> {
    const updateLocation = await this.locationService.updateLocation(
      data.id,
      data.state,
      data.city,
      data.pinCode,
      data.status
    );

    return {
      successCode: 200,
      successMessage: "locaton update success",
      list: updateLocation,
    };
  }

  /**
   *
   * @param res 403 | id is required
   * @param id string
   * @returns location object
   */
  @Get("getLocation/:id")
  @ApiOperation({ summary: "get location by id from this api" })
  @ApiParam({
    name: "id",
    example: "any",
  })
  @ApiResponse({
    status: 200,
    description: "location details",
  })
  @ApiResponse({
    status: 403,
    description: "id field are required",
  })
  async getLocationById(@Param("id") id: string): Promise<Object> {
    const getLocation = await this.locationService.getLocationById(id);
    return {
      successCode: 200,
      successMessage: "get location",
      list: getLocation,
    };
  }

  @Get("getAllLocation")
  @ApiOperation({ summary: "get All location  from this api" })
  async getAllLocation(
    @Query("pageSize") pageSize: number,
    @Query("newPage") newPage: number
  ): Promise<Object> {
    const pagination = {
      page: newPage || 1,
      size: pageSize || 10,
      searchKey: "",
    };
    const result = await this.locationService.getAllLocation(
      pagination.page,
      pagination.size,
      pagination.searchKey
    );
    return {
      successCod: 200,
      successMessage: "all categories list",
      list: result,
    };
  }
}
