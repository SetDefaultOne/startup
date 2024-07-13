import { Inject, Injectable } from "@nestjs/common";
import { GetPingDto } from "./dto/get-ping.dto";
import appConfig from "../app.config";
import { ConfigType } from "@nestjs/config";

@Injectable()
export class PingService {
    constructor(
        @Inject(appConfig.KEY)
        private readonly appConfiguration: ConfigType<typeof appConfig>,
    ) {}

    async getPing(dto: GetPingDto) {
        if (dto.message === "Ping!") {
            return {
                status: "success",
                message: "Pong!",
                data: {
                    environment: this.appConfiguration.deployment.environment,
                },
            };
        } else if (dto.message === "Pong!") {
            return {
                status: "success",
                message: "Ping!",
                environment: this.appConfiguration.deployment.environment,
            };
        }
    }
}
