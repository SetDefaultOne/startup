import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { CipherModule } from "../cipher/cipher.module";
import { DatabaseModule } from "../database/database.module";

@Module({
    imports: [DatabaseModule, CipherModule],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}
