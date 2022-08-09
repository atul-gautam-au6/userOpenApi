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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const http_exception_filter_1 = require("../../auth/exceptions/http.exception.filter");
const logging_interceptor_1 = require("../../auth/exceptions/logging.interceptor");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async insertUser(name, email, password, isSubAdmin, phone, otp) {
        const savedUser = new this.userModel({
            name,
            email,
            phone,
            password,
            isSubAdmin,
            otp,
        });
        const result = await savedUser.save();
        return result;
    }
    async updateUser(id, name, email, isSubAdmin, phone, status) {
        const result = await this.userModel.findByIdAndUpdate(id, {
            name,
            email,
            phone,
            isSubAdmin,
            status,
        }, { new: true });
        return result;
    }
    async getUserById(id) {
        const result = await this.userModel
            .findById(id)
            .select('-password -isAdmin -isSubAdmin');
        return result;
    }
    async getUserByEmail(email) {
        const result = await this.userModel
            .findOne({ email })
            .select('-password -isAdmin -isSubAdmin');
        return result;
    }
    async successVerification(id) {
        const updateUser = await this.userModel.findByIdAndUpdate(id, {
            emailVerified: true,
            otp: null,
        }, { new: true });
    }
    async getAllUsers() {
        const result = await this.userModel.find();
        return result;
    }
    async signinUser(email, password) {
        const result = await this.userModel.findOne({ email: email });
        if (!result) {
            throw new common_1.UnauthorizedException('Invalid Username ');
        }
        if (await result.matchPassword(password)) {
            return result;
        }
        else {
            throw new common_1.UnauthorizedException('Invalid  Password');
        }
    }
    async searchUser(query, currentUser) {
        const result = await this.userModel.aggregate([
            {
                $match: {
                    $expr: {
                        $and: [
                            {
                                $eq: ['$status', true],
                            },
                            {
                                $eq: ['$emailVerified', true],
                            },
                            {
                                $eq: ['$isSubAdmin', false],
                            },
                            {
                                $eq: ['$isAdmin', false],
                            },
                            {
                                $ne: ['$_id', currentUser],
                            },
                        ],
                    },
                },
            },
            {
                $match: {
                    $expr: {
                        $regexMatch: {
                            input: '$name',
                            regex: query,
                            options: 'i',
                        },
                    },
                },
            },
            {
                $sort: {
                    _id: -1,
                },
            },
            {
                $limit: 5,
            },
            {
                $project: {
                    name: 1,
                    _id: 1,
                },
            },
        ]);
        return result;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    (0, common_1.UseInterceptors)(new logging_interceptor_1.LoggingInterceptor()),
    (0, common_1.UseFilters)(new http_exception_filter_1.HttpExceptionFilter()),
    __param(0, (0, mongoose_1.InjectModel)('user')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map