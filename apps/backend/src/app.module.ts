import { Module } from "@nestjs/common";
import { PingModule } from "./ping/ping.module";
import { ConfigModule } from "@nestjs/config";
import appConfig from "./app.config";
import { environmentValidation } from "./lib/environmentValidation";

@Module({
    imports: [
        ConfigModule.forRoot({
            cache: true,
            load: [appConfig],
            validate: environmentValidation,
        }),
        PingModule,
    ],
})
export class AppModule {}
