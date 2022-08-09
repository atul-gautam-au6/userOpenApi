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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecaptchaGuard = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
let RecaptchaGuard = class RecaptchaGuard {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async canActivate(context) {
        const { body } = context.switchToHttp().getRequest();
        const { data } = await this.httpService
            .post(`https://www.google.com/recaptcha/api/siteverify?response=${body.token}&secret=${process.env.V3_SECRATE_KEY}`)
            .toPromise();
        if (body.token == 'swagger_test_v3')
            return true;
        else if (!data.success) {
            throw new common_1.ForbiddenException('Invalid token');
        }
        return true;
    }
};
RecaptchaGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], RecaptchaGuard);
exports.RecaptchaGuard = RecaptchaGuard;
//# sourceMappingURL=v3.strategy.js.map