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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
const mongoose_2 = require("mongoose");
const http_exception_filter_1 = require("../../auth/exceptions/http.exception.filter");
const local_auth_guard_1 = require("../../auth/guard/local-auth.guard");
const user_auth_guard_1 = require("../../auth/guard/user-auth.guard");
const auth_service_1 = require("../../auth/services/auth.service");
const v3_strategy_1 = require("../../auth/strategy/v3.strategy");
const resources_service_1 = require("../../resources/resources.service");
const user_service_1 = require("../services/user.service");
const logging_interceptor_1 = require("../../auth/exceptions/logging.interceptor");
let UserController = class UserController {
    constructor(userModel, userService, resourcesService, authService) {
        this.userModel = userModel;
        this.userService = userService;
        this.resourcesService = resourcesService;
        this.authService = authService;
    }
    async signinUser(req, res, data) {
        const user = await this.authService.login(req.user);
        res.cookie("auth-cookie", user.access_token, { httpOnly: true });
        return {
            successCode: 200,
            successMesssgae: "login success",
        };
    }
    async userSignup(data) {
        const otp = await this.resourcesService.generateNotification();
        const newUser = await this.userService.insertUser(data.name, data.email, data.password, false, data.phone, Number(otp));
        this.resourcesService.sendMail({
            to: "atul.vayuz@gmail.com",
            subject: "THIP | Otp verification",
            html: await this.resourcesService.otpService(Number(otp)),
        });
        return {
            successCode: 201,
            successMessage: "user create success",
        };
    }
    async otpVerification(res, data) {
        const getUser = await this.userService.getUserByEmail(data.email);
        if (!getUser) {
            return res.status(401).json({
                errorCode: 401,
                errorMessage: "user not found",
            });
        }
        else {
            return res.status(401).json({
                errorCode: 401,
                errorMessage: "otp not match",
            });
        }
    }
    async myProfile(Req) {
        const newUser = await this.userService.getUserById(Req.user.id);
        return {
            successCode: 200,
            successMessage: "User profile ",
            list: newUser,
        };
    }
};
__decorate([
    (0, common_1.Post)("signin"),
    (0, common_1.UseGuards)(v3_strategy_1.RecaptchaGuard, local_auth_guard_1.LocalAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: "user login from this api" }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object",
            properties: {
                username: {
                    type: "string",
                    example: "any",
                    description: "this is user email *",
                },
                password: {
                    type: "password",
                    example: "thi@123P",
                    description: "this is user password *",
                },
                token: {
                    type: "string",
                    example: "swagger_test_v3",
                    description: "this is v3 token *",
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "signin success ",
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: "Unauthorized",
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: "Something went wrong",
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signinUser", null);
__decorate([
    (0, common_1.Post)("signup"),
    (0, swagger_1.ApiOperation)({ summary: "signup user from this api" }),
    (0, swagger_1.ApiSecurity)("bearer"),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object",
            properties: {
                name: {
                    type: "string",
                    example: "atul",
                    description: "this is user name *",
                },
                email: {
                    type: "string",
                    example: "atul.vayuz@gmail.com",
                    description: "this is user email *",
                },
                phone: {
                    type: "number",
                    example: "7389204063",
                    description: "this is user phone *",
                },
                password: {
                    type: "string",
                    example: "atul12345@G",
                    description: "this is user password *",
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "user signin success ",
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: "Internal server error",
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "userSignup", null);
__decorate([
    (0, common_1.Put)("otpVerification"),
    (0, swagger_1.ApiOperation)({ summary: "signup user otp verification from this api" }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object",
            properties: {
                email: {
                    type: "string",
                    example: "atul.vayuz@gmail.com",
                    description: "this is user email *",
                },
                otp: {
                    type: "number",
                    example: 1234,
                    description: "this is otp *",
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "user verification  success ",
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: "invalid otp",
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: "Internal server error",
    }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "otpVerification", null);
__decorate([
    (0, swagger_1.ApiSecurity)("bearer"),
    (0, common_1.UseGuards)(user_auth_guard_1.JwtUserGuard),
    (0, common_1.Get)("myProfile"),
    (0, swagger_1.ApiOperation)({ summary: "my (user) profile from this api" }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "myProfile", null);
UserController = __decorate([
    (0, swagger_1.ApiTags)("user"),
    (0, common_1.Controller)("user"),
    (0, common_1.UseFilters)(new http_exception_filter_1.HttpExceptionFilter()),
    (0, common_1.UseInterceptors)(new logging_interceptor_1.LoggingInterceptor()),
    __param(0, (0, mongoose_1.InjectModel)("user")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_service_1.UserService,
        resources_service_1.ResourcesService,
        auth_service_1.AuthService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map