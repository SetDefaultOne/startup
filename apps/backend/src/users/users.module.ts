import { forwardRef, Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { DatabaseModule } from "../database/database.module";
import { CipherModule } from "../cipher/cipher.module";
import { AuthModule } from "../auth/auth.module";

@Module({
    imports: [DatabaseModule, CipherModule, forwardRef(() => AuthModule)],
    providers: [UsersService],
    controllers: [UsersController],
    exports: [UsersService],
})
export class UsersModule {}
