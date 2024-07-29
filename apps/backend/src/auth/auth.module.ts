import { forwardRef, Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { CipherModule } from "../cipher/cipher.module";
import { DatabaseModule } from "../database/database.module";
import { JwtModule } from "@nestjs/jwt";
import { JwtConfigService } from "./jwt.config.service";
import { ConfigModule } from "@nestjs/config";
import authConfig from "./auth.config";
import appConfig from "../app.config";
import { UsersModule } from "../users/users.module";
import { AuthGuard } from "./auth.guard";

@Module({
    imports: [
        ConfigModule.forFeature(appConfig),
        ConfigModule.forFeature(authConfig),
        DatabaseModule,
        CipherModule,
        JwtModule.registerAsync({
            useClass: JwtConfigService,
            imports: [ConfigModule.forFeature(authConfig)],
        }),
        forwardRef(() => UsersModule),
    ],
    providers: [AuthService, AuthGuard],
    controllers: [AuthController],
})
export class AuthModule {}
