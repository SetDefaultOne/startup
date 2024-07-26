import { Module } from "@nestjs/common";
import { PingModule } from "./ping/ping.module";
import { ConfigModule } from "@nestjs/config";
import appConfig from "./app.config";
import { environmentValidation } from "./lib/environmentValidation";
import { UsersModule } from "./users/users.module";
import { DatabaseModule } from "./database/database.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            cache: true,
            load: [appConfig],
            validate: environmentValidation,
        }),
        DatabaseModule,
        PingModule,
        UsersModule,
    ],
})
export class AppModule {}
