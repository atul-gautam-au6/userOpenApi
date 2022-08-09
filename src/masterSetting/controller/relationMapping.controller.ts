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
import { relation } from "../interface/relation.interface";
import { RelationService } from "../services/relation.service";

@ApiTags("master-setting")
@ApiSecurity("bearer")
// @UseGuards(JwtAuthGuard)
@UseFilters(new HttpExceptionFilter())
@UseInterceptors(new LoggingInterceptor())
@Controller("masterSetting")
export class RelationController {
  constructor(
    @InjectModel("relation")
    private readonly relationModel: Model<relation>,
    private readonly relationService: RelationService
  ) {}

  /**
   *
   * @param res 403 required all field
   * @param data relationship,type
   * @returns
   */
  @Post("createRelation")
  @ApiOperation({ summary: "create relation from this api" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        relationship: {
          type: "string",
          example: "any",
          description: "this is relationship name*",
        },
        type: {
          type: "string",
          enum: ["Family", "Professional", "Locality"],
          description: "this is type of relation*",
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: "relation create",
  })
  @ApiResponse({
    status: 403,
    description: "All field are required",
  })
  async createRelation(
    @Body()
    data: {
      relationship: string;
      type: string;
    }
  ): Promise<Object> {
    const newrelation = await this.relationService.insertRelation(
      data.relationship,
      data.type
    );

    return {
      successCode: 201,
      successMessage: "relaton create success",
      list: newrelation,
    };
  }

  /**
   *
   * @param data id,state,city,pincode,status
   * @returns updated object
   */
  @Put("updateRelation")
  @ApiOperation({ summary: "create relation from this api" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          example: "any",
          description: "this is your relation id",
        },
        relationship: {
          type: "string",
          example: "any",
          description: "this is relationship name*",
        },
        type: {
          type: "string",
          enum: ["Family", "Professional", "Locality"],
          description: "this is type of relation*",
        },
        status: {
          type: "boolean",
          example: true,
          description: "this is status of relation*",
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: "relation update",
  })
  @ApiResponse({
    status: 403,
    description: "id field is required",
  })
  async updateRelation(
    @Body()
    data: {
      id: string;
      relationship: string;
      type: string;

      status: boolean;
    }
  ): Promise<Object> {
    const updaterelation = await this.relationService.updateRelation(
      data.id,
      data.relationship,
      data.type,
      data.status
    );

    return {
      successCode: 200,
      successMessage: "relaton update success",
      list: updaterelation,
    };
  }

  /**
   *
   * @param res 403 | id is required
   * @param id string
   * @returns relation object
   */
  @Get("findById/:id")
  @ApiOperation({ summary: "get relation by id from this api" })
  @ApiParam({
    name: "id",
    example: "any",
  })
  @ApiResponse({
    status: 200,
    description: "relation details",
  })
  @ApiResponse({
    status: 403,
    description:
      "id field arpage: number, size: number, searchKey: stringe required",
  })
  async getRelationById(@Param("id") id: string): Promise<Object> {
    const getrelation = await this.relationService.getRelationById(id);
    return {
      successCode: 200,
      successMessage: "get relation",
      list: getrelation,
    };
  }

  /**
   * @description   get all relation list
   * @returns all relations list
   */
  @ApiOperation({ summary: "get all relation from this api" })
  @ApiResponse({
    status: 200,
    description: "relation list",
  })
  @ApiResponse({
    status: 500,
    description: "server error",
  })
  @Get("findAll/relation")
  async getAllRelation(
    @Query("pageSize") pageSize: number,
    @Query("newPage") newPage: number
  ): Promise<Object> {
    const pagination = {
      page: newPage || 1,
      size: pageSize || 10,
      searchKey: "",
    };
    const result = await this.relationService.getAllRelation(
      pagination.page,
      pagination.size,
      pagination.searchKey
    );
    return {
      successCode: 200,
      successMessage: "get relation list",
      list: result,
    };
  }
}
