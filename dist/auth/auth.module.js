"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./services/auth.service");
const local_strategy_1 = require("./strategy/local.strategy");
const jwt_strategy_1 = require("./strategy/jwt.strategy");
const user_strategy_1 = require("./strategy/user.strategy");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const constants_1 = require("./constants");
const user_module_1 = require("../user/user.module");
const v3_strategy_1 = require("./strategy/v3.strategy");
const axios_1 = require("@nestjs/axios");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule,
            user_module_1.UserModule,
            passport_1.PassportModule.register({ session: true }),
            jwt_1.JwtModule.register({
                secret: `${constants_1.jwtConstants.secret}`,
                signOptions: { expiresIn: '1h' },
            }),
        ],
        providers: [
            auth_service_1.AuthService,
            local_strategy_1.LocalStrategy,
            jwt_strategy_1.JwtStrategy,
            user_strategy_1.UserStrategy,
            v3_strategy_1.RecaptchaGuard,
        ],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map