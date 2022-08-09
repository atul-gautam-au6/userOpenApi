import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Response,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ApiSecurity, ApiTags } from "@nestjs/swagger";
import { Model } from "mongoose";
import { HttpExceptionFilter } from "src/auth/exceptions/http.exception.filter";
import { LoggingInterceptor } from "src/auth/exceptions/logging.interceptor";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";
import { hospital } from "../interfaces/hospital.interface";
import { HospitalService } from "../services/hospital.service";

@ApiTags("hospital")
@Controller("admin/hospital")
@ApiSecurity("bearer")
@UseGuards(JwtAuthGuard)
@UseFilters(new HttpExceptionFilter())
@UseInterceptors(new LoggingInterceptor())
export class HospitalController {
  constructor(
    @InjectModel("hospital")
    private readonly hospitalModel: Model<hospital>,
    private readonly hospitalService: HospitalService
  ) {}

  /**
   * @description create hospital
   * @param res all fields are required
   * @param data {name,email,phone,location,point,bannerImage,image,description}
   * @returns created object
   */
  @Post("createHospital")
  async createHospital(
    @Response() res,
    @Body()
    data: {
      name: string;
      email: string;
      phone: number;
      location: string;
      point: any;
      bannerImage: string;
      image: string;
      description: string;
    }
  ): Promise<Object> {
    if (
      !data.name ||
      !data.email ||
      !data.phone ||
      !data.bannerImage ||
      !data.image ||
      !data.description
    ) {
      res.status(403).json({
        errorCode: 403,
        errorMessage: "All field are required",
      });
    }
    const result = await this.hospitalService.insertHospital(
      data.name,
      data.email,
      data.phone,
      data.location,
      data.point,
      data.bannerImage,
      data.image,
      data.description
    );
    return {
      successCode: 201,
      successMessage: "hospita create sucess",
      list: result,
    };
  }

  /**
   * @description update hospital
   * @param res all fields are required
   * @param data {name,email,phone,location,point,bannerImage,image,description}
   * @returns created object
   */
  @Put("updateHospital")
  async updateeHospital(
    @Response() res,
    @Body()
    data: {
      id: string;
      name: string;
      email: string;
      phone: number;
      location: string;
      point: any;
      bannerImage: string;
      image: string;
      description: string;
      status: boolean;
    }
  ): Promise<Object> {
    if (!data.id) {
      res.status(403).json({
        errorCode: 403,
        errorMessage: "Id is required",
      });
    }
    const result = await this.hospitalService.updateHospital(
      data.id,
      data.name,
      data.email,
      data.phone,
      data.location,
      data.point,
      data.bannerImage,
      data.image,
      data.description,
      data.status
    );
    return {
      successCode: 200,
      successMessage: "hospita update sucess",
      list: result,
    };
  }

  /**
   *
   * @param res id is required
   * @param id for details of hospital
   * @returns details object
   */
  @Get("findById/:id")
  async getHospitalById(
    @Response() res,
    @Param("id") id: string
  ): Promise<Object> {
    if (!id) {
      return res.status(403).json({
        errorCode: 403,
        errorMessgae: "id is required",
      });
    }

    const result = await this.hospitalService.getHospitalById(id);
    return {
      successCode: 200,
      successMessage: "get hospital details",
      list: result,
    };
  }

  @Get("allHospital")
  async allHospitals(): Promise<Object> {
    const pagination = { page: 1, size: 10, searchKey: "" };
    const result = await this.hospitalService.getHospitalList(
      pagination.page,
      pagination.size,
      pagination.searchKey
    );
    return {
      successCod: 200,
      successMessage: "all hospital list",
      list: result,
    };
  }
}
