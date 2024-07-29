import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { DatabaseModule } from "../database/database.module";
import { CipherModule } from "../cipher/cipher.module";
import { AuthService } from "./auth.service";
import { ConfigModule } from "@nestjs/config";
import appConfig from "../app.config";
import authConfig from "./auth.config";
import { JwtModule } from "@nestjs/jwt";
import { JwtConfigService } from "./jwt.config.service";
import { forwardRef } from "@nestjs/common";
import { UsersModule } from "../users/users.module";

describe("AuthController", () => {
    let controller: AuthController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
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
            controllers: [AuthController],
            providers: [AuthService],
        }).compile();

        controller = module.get<AuthController>(AuthController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
