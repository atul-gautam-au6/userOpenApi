"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoodController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const mood_service_1 = require("../services/mood.service");
let MoodController = class MoodController {
    constructor(moodService) {
        this.moodService = moodService;
    }
    async addMood(file, data) {
        if (!(file === null || file === void 0 ? void 0 : file.filename)) {
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
        const newMood = await this.moodService.insertMood(data.title, file === null || file === void 0 ? void 0 : file.filename, data.status);
        return {
            successCode: 201,
            successMessage: "Mood created successfully",
            list: newMood,
        };
    }
    async getAllMoods(pageSize, newPage, searchKey) {
        const pagination = {
            page: newPage || 1,
            size: pageSize || 10,
            searchKey: searchKey || "",
        };
        const getMoods = await this.moodService.getAllMoods(pagination.page, pagination.size, pagination.searchKey);
        return {
            successCode: 200,
            successMessage: "Moods Succesfully retrieved",
            list: getMoods,
        };
    }
    async updateLogo(file, data) {
        if (!data.id) {
            return {
                errorCode: 500,
                errorMessage: "Id is required for update*",
            };
        }
        const updatedMood = await this.moodService.updateMood(data.id, file === null || file === void 0 ? void 0 : file.filename, data.status);
        return {
            successCode: 200,
            successMessage: "mood update success",
            list: updatedMood,
        };
    }
    async deleteMoodById(moodId) {
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
    async getMoodId(moodId) {
        const getMood = await this.moodService.getMoodByid(moodId);
        return {
            successCode: 200,
            successMessage: "Mood  detail",
            list: getMood,
        };
    }
};
__decorate([
    (0, common_1.Post)("addMood"),
    (0, swagger_1.ApiOperation)({ summary: "Create mood from this api" }),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, swagger_1.ApiBody)({
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
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "mood added",
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: "title and icon is mandatory",
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("icon", {
        dest: "client/icon/",
        limits: {
            fieldSize: 10 * 1024 * 1024,
        },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MoodController.prototype, "addMood", null);
__decorate([
    (0, common_1.Get)("moods"),
    (0, swagger_1.ApiOperation)({ summary: "get all moods in this api" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "moods list",
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: "server error",
    }),
    __param(0, (0, common_1.Query)("pageSize")),
    __param(1, (0, common_1.Query)("newPage")),
    __param(2, (0, common_1.Query)("searchKey")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], MoodController.prototype, "getAllMoods", null);
__decorate([
    (0, common_1.Put)("/updateMood"),
    (0, swagger_1.ApiOperation)({ summary: "update Mood from this api" }),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, swagger_1.ApiBody)({
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
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "mood updated",
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: "Internal server error",
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("logo", {
        dest: "client/icon/",
        limits: {
            fieldSize: 10 * 1024 * 1024,
        },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MoodController.prototype, "updateLogo", null);
__decorate([
    (0, common_1.Delete)("/deleteById/:moodId"),
    (0, swagger_1.ApiOperation)({ summary: "Delete Mood from this api" }),
    (0, swagger_1.ApiParam)({
        name: "moodId",
        example: "any",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "mood deleted",
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: "Internal server error",
    }),
    __param(0, (0, common_1.Param)("moodId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MoodController.prototype, "deleteMoodById", null);
__decorate([
    (0, common_1.Get)("mood/:moodId"),
    (0, swagger_1.ApiOperation)({ summary: "get category question by id from this api" }),
    (0, swagger_1.ApiParam)({
        name: "moodId",
        example: "any",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Mood details",
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: "id field are required",
    }),
    __param(0, (0, common_1.Param)("moodId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MoodController.prototype, "getMoodId", null);
MoodController = __decorate([
    (0, swagger_1.ApiTags)("master-setting"),
    (0, swagger_1.ApiSecurity)("bearer"),
    (0, common_1.Controller)("admin"),
    __metadata("design:paramtypes", [mood_service_1.MoodService])
], MoodController);
exports.MoodController = MoodController;
//# sourceMappingURL=mood.controller.js.map