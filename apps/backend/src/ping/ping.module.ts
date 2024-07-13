import { Module } from "@nestjs/common";
import { PingController } from "./ping.controller";
import { PingService } from "./ping.service";
import { ConfigModule } from "@nestjs/config";
import appConfig from "../app.config";

@Module({
    imports: [ConfigModule.forFeature(appConfig)],
    controllers: [PingController],
    providers: [PingService],
})
export class PingModule {}
