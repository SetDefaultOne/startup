import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { DatabaseModule } from "../database/database.module";
import { CipherModule } from "../cipher/cipher.module";

@Module({
    imports: [DatabaseModule, CipherModule],
    providers: [UsersService],
    controllers: [UsersController],
})
export class UsersModule {}
