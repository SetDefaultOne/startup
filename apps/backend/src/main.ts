import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ClassSerializerInterceptor, ValidationPipe, VERSION_NEUTRAL, VersioningType } from "@nestjs/common";
import { validationExceptionFactory } from "./lib/validation-exception.factory";
import { ConfigService } from "@nestjs/config";
import { AppConfig, AppConfigKey } from "./app.config";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get(ConfigService);
    const configuration = configService.getOrThrow<AppConfig>(AppConfigKey);

    app.enableCors({
        credentials: true,
        origin: true,
    });

    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: VERSION_NEUTRAL,
    });

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            stopAtFirstError: true,
            exceptionFactory: validationExceptionFactory,
            enableDebugMessages: configuration.deployment.environment !== "production",
        }),
    );

    app.useGlobalInterceptors(
        new ClassSerializerInterceptor(new Reflector(), {
            enableCircularCheck: true,
            enableImplicitConversion: true,
            excludePrefixes: ["_"],
        }),
    );

    await app.listen(configuration.deployment.port);
}

bootstrap();
