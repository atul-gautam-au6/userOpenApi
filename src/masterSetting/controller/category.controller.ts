import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
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
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";
import { CategoryService } from "../services/category.service";
import { category } from "../interface/category.interface";
import { HttpExceptionFilter } from "src/auth/exceptions/http.exception.filter";
import { LoggingInterceptor } from "src/auth/exceptions/logging.interceptor";

@ApiTags("master-setting")
@ApiSecurity("bearer")
// @UseGuards(JwtAuthGuard)
@UseFilters(new HttpExceptionFilter())
@UseInterceptors(new LoggingInterceptor())
@Controller("admin")
export class CategoryController {
  constructor(
    @InjectModel("category")
    private readonly categoryModel: Model<category>,
    private readonly categoryService: CategoryService
  ) {}

  /*
    @desc
      post request
      create category
      secured by admin
      accept name 
  */
  @Post("createCategory")
  @ApiOperation({ summary: "create category  from this api" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        name: {
          type: "string",
          example: "any",
          description: "this is category name*",
        },
        status: {
          type: "booelan",
          example: true,
          description: "this is status of category*",
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: "category create",
  })
  @ApiResponse({
    status: 403,
    description: "All field are required",
  })
  async createCategory(
    @Body()
    data: {
      name: string;
      status: boolean;
      isPodcast: boolean;
    }
  ): Promise<Object> {
    if (!data.name || !data.status) {
      return {
        errorCode: 403,
        errorMessage: "Name and status fields are required*",
      };
    }
    const newCategory = await this.categoryService.insertCategory(
      data.name,
      data.status, //optional
      false, //category for podcats
      false // category for question
    );
    return {
      successCode: 201,
      successMessage: "category create success",
      list: newCategory,
    };
  }

  /*
    @desc
      put request
      update category
      secured by admin
      accept id name status
  */
  @Put("updateCategory")
  @ApiOperation({ summary: "update category  from this api" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          example: "any",
          description: "this is your category",
        },
        name: {
          type: "string",
          example: "any",
          description: "this is category name*",
        },
        status: {
          type: "boolean",
          example: true,
          description: "this is status of category*",
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: "category update",
  })
  @ApiResponse({
    status: 403,
    description: "id field is required",
  })
  async updateCategory(
    @Body()
    data: {
      id: string;
      name: string;
      status: boolean;
    }
  ): Promise<Object> {
    const getcategory = await this.categoryService.updateCategory(
      data.id,
      data.name,
      data.status,
      false, //category for podcast
      false // category for question
    );
    return {
      successCode: 200,
      successMessage: "category update success",
      list: getcategory,
    };
  }

  /*
    @desc
      get req
      get category by id
      secured by admin
      accept idpodcats
      
  */
  @Get("category/:categoryId")
  @ApiOperation({ summary: "get category by id from this api" })
  @ApiParam({
    name: "categoryId",
    example: "any",
  })
  @ApiResponse({
    status: 200,
    description: "category details",
  })
  @ApiResponse({
    status: 403,
    description: "id field are required",
  })
  async getCategoryById(
    @Param("categoryId") categoryId: string
  ): Promise<Object> {
    const getCategory = await this.categoryService.getCategoryByid(categoryId);
    return {
      successCode: 200,
      successMessage: "category details ",
      list: getCategory,
    };
  }

  /*
    @desc
      post request
      create category podcast
      secured by admin
      accept name 
  */
  @Post("createCategoryPodcast")
  @ApiOperation({ summary: "create category podcast from this api" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        name: {
          type: "string",
          example: "any",
          description: "this is category podcast name*",
        },
        isPodcast: {
          type: "booelan",
          example: true,
          description: "this is status of category podcast*",
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: "category podcast create",
  })
  @ApiResponse({
    status: 403,
    description: "All field are required",
  })
  async createCategoryPodcast(
    @Body()
    data: {
      name: string;
      status: boolean;
      isPodcast: boolean;
    }
  ): Promise<Object> {
    const newCategory = await this.categoryService.insertCategory(
      data.name,
      data.status, //optional
      true, //true for podcast category
      false // category for question
    );
    return {
      successCode: 201,
      successMessage: "category podcast create success",
      list: newCategory,
    };
  }

  /*
        @desc
          put request
          update category podcast
          secured by admin
          accept id name status
      */
  @Put("updateCategoryPodcast")
  @ApiOperation({ summary: "update category podcast from this api" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          example: "any",
          description: "this is your category podcast",
        },
        name: {
          type: "string",
          example: "any",
          description: "this is category podcast name*",
        },
        status: {
          type: "boolean",
          example: true,
          description: "this is status of category*",
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: "category update",
  })
  @ApiResponse({
    status: 403,
    description: "id field is required",
  })
  async updateCategoryPodcast(
    @Body()
    data: {
      id: string;
      name: string;
      status: boolean;
    }
  ): Promise<Object> {
    const getCategory = await this.categoryService.updateCategory(
      data.id,
      data.name,
      data.status,
      true, //optional
      false // category for question
    );
    return {
      successCode: 200,
      successMessage: "category podcats update success ",
      list: getCategory,
    };
  }

  /*
        @desc
          get req
          get category podcast by id
          secured by admin
          accept id
          
      */
  @Get("categoryPodcast/:categoryId")
  @ApiOperation({ summary: "get category podcats by id from this api" })
  @ApiParam({
    name: "categoryId",
    example: "any",
  })
  @ApiResponse({
    status: 200,
    description: "category podcats details",
  })
  @ApiResponse({
    status: 403,
    description: "id field are required",
  })
  async getCategoryPodcastById(
    @Param("categoryId") categoryId: string
  ): Promise<Object> {
    const getCategory = await this.categoryService.getCategoryByid(categoryId);
    return {
      successCode: 200,
      successMessage: "category podcats detail  ",
      list: getCategory,
    };
  }

  /*
    @desc
      post request
      create category question
      secured by admin
      accept name 
  */
  @Post("createCategoryQuestion")
  @ApiOperation({ summary: "create category question from this api" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        name: {
          type: "string",
          example: "any",
          description: "this is category question name*",
        },
        status: {
          type: "booelan",
          example: true,
          description: "this is status of category question*",
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: "category create",
  })
  @ApiResponse({
    status: 403,
    description: "All field are required",
  })
  async createCategoryQuestion(
    @Req() req,
    @Body()
    data: {
      name: string;
      status: boolean;
    }
  ): Promise<Object> {
    const newCategory = await this.categoryService.insertCategory(
      data.name,
      data.status, //optional
      false, //true for podcast category
      true // category for question
    );
    return {
      successCode: 201,
      successMessage: "category question create success",
      list: newCategory,
    };
  }

  /*
            @desc
              put request
              update category question
              secured by admin
              accept id name status
          */
  @Put("updateCategoryQuestion")
  @ApiOperation({ summary: "update category question from this api" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          example: "any",
          description: "this is your category question",
        },
        name: {
          type: "string",
          example: "any",
          description: "this is category name question*",
        },
        status: {
          type: "boolean",
          example: true,
          description: "this is status of category question*",
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: "category update",
  })
  @ApiResponse({
    status: 403,
    description: "id field is required",
  })
  async updateCategoryQuestion(
    @Body()
    data: {
      id: string;
      name: string;
      status: boolean;
    }
  ): Promise<Object> {
    const getCategory = await this.categoryService.updateCategory(
      data.id,
      data.name,
      data.status,
      false, //category for podcast
      true // category for question
    );
    return {
      successCode: 200,
      successMessage: "category question detail",
      list: getCategory,
    };
  }

  /*
            @desc
              get req
              get category question by id
              secured by admin
              accept id
              
          */
  @Get("categoryQuestion/:categoryId")
  @ApiOperation({ summary: "get category question by id from this api" })
  @ApiParam({
    name: "categoryId",
    example: "any",
  })
  @ApiResponse({
    status: 200,
    description: "category question details",
  })
  @ApiResponse({
    status: 403,
    description: "id field are required",
  })
  async getCategoryQuById(
    @Param("categoryId") categoryId: string
  ): Promise<Object> {
    const getCategory = await this.categoryService.getCategoryByid(categoryId);
    return {
      successCode: 200,
      successMessage: "category question detail  ",
      list: getCategory,
    };
  }

  @Get("categories/getAll")
  async getAllcategories(
    @Query("pageSize") pageSize: number,
    @Query("newPage") newPage: number,
    @Query("searchKey") searchKey: string,
    @Query("type") type: string
  ): Promise<Object> {
    const pagination = {
      page: newPage || 1,
      size: pageSize || 10,
      searchKey: searchKey || "",
    };
    const result = await this.categoryService.getAllCategory(
      pagination.page,
      pagination.size,
      pagination.searchKey,
      type
    );
    return {
      successCod: 200,
      successMessage: "all categories list",
      list: result,
    };
  }
}
