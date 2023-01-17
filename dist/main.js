"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const basicAuth = require("express-basic-auth");
const logging_interceptor_1 = require("./auth/exceptions/logging.interceptor");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalInterceptors(new logging_interceptor_1.LoggingInterceptor());
    app.use(["/api", "/api-json"], basicAuth({
        challenge: true,
        users: {
            [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
        },
    }));
    app.enableCors();
    app.use(cookieParser());
    const config = new swagger_1.DocumentBuilder()
        .setTitle("User crud Apis")
        .setDescription("User crud api documentation")
        .setVersion("1.0")
        .addBearerAuth({
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
    })
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup("api", app, document);
    await app.listen(process.env.PORT || 4000);
    common_1.Logger.log(`Server running at port ${process.env.PORT || 4000}`);
}
bootstrap();
//# sourceMappingURL=main.js.map