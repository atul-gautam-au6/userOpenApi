import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from "@nestjs/swagger";
import { MoodService } from "../services/mood.service";

@ApiTags("master-setting")
@ApiSecurity("bearer")
@Controller("admin")
export class MoodController {
  constructor(private readonly moodService: MoodService) {}

  /*
    Api for creating the mood
    Parameters are the title , icon and the status of the mood

  */

  @Post("addMood")
  @ApiOperation({ summary: "Create mood from this api" })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        title: {
          type: "string",
          example: "angry",
          description: "this is the mood title",
        },
        icon: {
          type: "string",
          format: "binary",
          description: "this is logo image url *",
        },
        status: {
          type: "boolean",
          example: "true/false",
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: "mood added",
  })
  @ApiResponse({
    status: 403,
    description: "title and icon is mandatory",
  })
  @UseInterceptors(
    FileInterceptor("icon", {
      dest: "client/icon/",
      limits: {
        fieldSize: 10 * 1024 * 1024,
      },
    })
  )
  async addMood(
    @UploadedFile() file,
    @Body() data: { title: string; icon: string; status: boolean }
  ): Promise<Object> {
    if (!file?.filename) {
      return {
        errorCode: 500,
        errorMessage: "icon is required*",
      };
    }
    if (!data.title || !data.status) {
      return {
        errorCode: 403,
        errorMessage: "title and icon are required",
      };
    }
    const newMood = await this.moodService.insertMood(
      data.title,
      file?.filename,
      data.status
    );
    return {
      successCode: 201,
      successMessage: "Mood created successfully",
      list: newMood,
    };
  }

  /*
    api for getting all the moods
    response will be the list of moods
  */

  @Get("moods")
  @ApiOperation({ summary: "get all moods in this api" })
  @ApiResponse({
    status: 200,
    description: "moods list",
  })
  @ApiResponse({
    status: 500,
    description: "server error",
  })
  async getAllMoods(
    @Query("pageSize") pageSize: number,
    @Query("newPage") newPage: number,
    @Query("searchKey") searchKey: string
  ): Promise<Object> {
    const pagination = {
      page: newPage || 1,
      size: pageSize || 10,
      searchKey: searchKey || "",
    };
    // const pagination={page:1,size:10,search:''}
    const getMoods = await this.moodService.getAllMoods(
      pagination.page,
      pagination.size,
      pagination.searchKey
    );
    return {
      successCode: 200,
      successMessage: "Moods Succesfully retrieved",
      list: getMoods,
    };
  }

  /*
  Api for updating the mood 
  Admin can update the icon and title of the moods
  
  */
  @Put("/updateMood")
  @ApiOperation({ summary: "update Mood from this api" })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          example: "any",
          description: "this is mood id*",
        },
        logo: {
          type: "string",
          format: "binary",
          description: "this is Mood image url *",
        },

        status: {
          type: "boolean",
          example: true,
          description: "this is Mood status *",
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: "mood updated",
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error",
  })
  @UseInterceptors(
    FileInterceptor("logo", {
      dest: "client/icon/",
      limits: {
        fieldSize: 10 * 1024 * 1024,
      },
    })
  )
  async updateLogo(
    @UploadedFile() file,
    @Body()
    data: {
      id: string;
      icon: string;
      status: boolean;
    }
  ): Promise<Object> {
    if (!data.id) {
      return {
        errorCode: 500,
        errorMessage: "Id is required for update*",
      };
    }
    const updatedMood = await this.moodService.updateMood(
      data.id,
      file?.filename,
      data.status
    );
    return {
      successCode: 200,
      successMessage: "mood update success",
      list: updatedMood,
    };
  }

  /*
   Delete api for deleting the mood
   it will take the mood id and delete that from the list
   
   */
  @Delete("/deleteById/:moodId")
  @ApiOperation({ summary: "Delete Mood from this api" })
  @ApiParam({
    name: "moodId",
    example: "any",
  })
  @ApiResponse({
    status: 200,
    description: "mood deleted",
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error",
  })
  async deleteMoodById(@Param("moodId") moodId: string): Promise<Object> {
    if (!moodId) {
      return {
        errorCode: 500,
        errorMessage: "mood id is required*",
      };
    }
    const deletedMood = await this.moodService.deleteMood(moodId);
    console.log(deletedMood, "deletedMood");
    return {
      successCode: 200,
      successMessage: "Mood Deleted",
    };
  }
  @Get("mood/:moodId")
  @ApiOperation({ summary: "get category question by id from this api" })
  @ApiParam({
    name: "moodId",
    example: "any",
  })
  @ApiResponse({
    status: 200,
    description: "Mood details",
  })
  @ApiResponse({
    status: 403,
    description: "id field are required",
  })
  async getMoodId(@Param("moodId") moodId: string): Promise<Object> {
    const getMood = await this.moodService.getMoodByid(moodId);
    return {
      successCode: 200,
      successMessage: "Mood  detail",
      list: getMood,
    };
  }
}
