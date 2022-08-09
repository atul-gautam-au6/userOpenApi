"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
let LoggingInterceptor = class LoggingInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.catchError)((err) => {
            var _a, _b;
            console.log("my msg start: ", err.message, ": end");
            if (err.code == 11000 && ((_a = err === null || err === void 0 ? void 0 : err.keyPattern) === null || _a === void 0 ? void 0 : _a.email)) {
                return (0, rxjs_1.throwError)(() => new common_1.BadGatewayException('Email already there'));
            }
            if (err.code == 11000 && ((_b = err === null || err === void 0 ? void 0 : err.keyPattern) === null || _b === void 0 ? void 0 : _b.phone)) {
                return (0, rxjs_1.throwError)(() => new common_1.BadGatewayException('Phone already there'));
            }
            else if (err.path == '_id') {
                return (0, rxjs_1.throwError)(() => new common_1.BadGatewayException('Invalid id'));
            }
            else {
                return (0, rxjs_1.throwError)(() => new common_1.BadGatewayException(err));
            }
        }));
    }
};
LoggingInterceptor = __decorate([
    (0, common_1.Injectable)()
], LoggingInterceptor);
exports.LoggingInterceptor = LoggingInterceptor;
//# sourceMappingURL=logging.interceptor.js.map