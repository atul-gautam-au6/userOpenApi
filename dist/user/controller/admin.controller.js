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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
const mongoose_2 = require("mongoose");
const http_exception_filter_1 = require("../../auth/exceptions/http.exception.filter");
const auth_service_1 = require("../../auth/services/auth.service");
const user_service_1 = require("../services/user.service");
const logging_interceptor_1 = require("../../auth/exceptions/logging.interceptor");
let AdminController = class AdminController {
    constructor(userModel, userService, authService) {
        this.userModel = userModel;
        this.userService = userService;
        this.authService = authService;
    }
    async createUser(data) {
        const newUser = await this.userService.insertUser(data.name, data.email, data.password, false, data.phone, null);
        return {
            successCode: 201,
            successMessage: "User create success",
            list: newUser,
        };
    }
    async updateUser(data) {
        const newUser = await this.userService.updateUser(data.id, data.name, data.email, false, data.phone, data.status);
        return {
            successCode: 200,
            successMessage: "User update success",
            list: newUser,
        };
    }
    async getUserById(userId) {
        const newUser = await this.userService.getUserById(userId);
        return {
            successCode: 200,
            successMessage: "User details",
            list: newUser,
        };
    }
    async getAllUsers() {
        const newUser = await this.userService
            .getAllUsers();
        return {
            successCode: 200,
            successMessage: "User list",
            list: newUser,
        };
    }
};
__decorate([
    (0, common_1.Post)("create-user"),
    (0, swagger_1.ApiOperation)({ summary: "create user from this api" }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object",
            properties: {
                name: {
                    type: "string",
                    example: "any",
                    description: "this is user name *",
                },
                email: {
                    type: "string",
                    example: "any",
                    description: "this is user email *",
                },
                phone: {
                    type: "number",
                    example: "any",
                    description: "this is user phone *",
                },
                password: {
                    type: "string",
                    example: "any",
                    description: "this is user password *",
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "user create",
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: "internal server error",
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createUser", null);
__decorate([
    (0, common_1.Put)("update-user"),
    (0, swagger_1.ApiOperation)({ summary: "update user from this api" }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object",
            properties: {
                id: {
                    type: "string",
                    example: "any",
                    description: "this is user id *",
                },
                name: {
                    type: "string",
                    example: "any",
                    description: "this is user name *",
                },
                email: {
                    type: "string",
                    example: "any",
                    description: "this is user email *",
                },
                phone: {
                    type: "number",
                    example: "any",
                    description: "this is user phone *",
                },
                password: {
                    type: "string",
                    example: "any",
                    description: "this is user password *",
                },
                status: {
                    type: "boolean",
                    example: true,
                    description: "this is user status *",
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "user update",
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: "internal server error",
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Get)("user/:userId"),
    (0, swagger_1.ApiOperation)({ summary: "get user by id from this api" }),
    (0, swagger_1.ApiParam)({
        name: "userId",
        example: "any",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "user details",
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: "id field are required",
    }),
    __param(0, (0, common_1.Param)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getUserById", null);
__decorate([
    (0, common_1.Get)("users"),
    (0, swagger_1.ApiOperation)({ summary: "get user  list from this api" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "user list",
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: "server error",
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllUsers", null);
AdminController = __decorate([
    (0, swagger_1.ApiTags)("User crud"),
    (0, common_1.Controller)("admin"),
    (0, common_1.UseInterceptors)(new logging_interceptor_1.LoggingInterceptor()),
    (0, common_1.UseFilters)(new http_exception_filter_1.HttpExceptionFilter()),
    __param(0, (0, mongoose_1.InjectModel)("user")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_service_1.UserService,
        auth_service_1.AuthService])
], AdminController);
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map