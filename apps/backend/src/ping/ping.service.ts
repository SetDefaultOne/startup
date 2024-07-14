import { Inject, Injectable } from "@nestjs/common";
import { PostPingDto } from "./dto/post-ping.dto";
import appConfig from "../app.config";
import { ConfigType } from "@nestjs/config";
import { GetPingSuccessResponseData, ResponseBody } from "@bootstrap-brand/sdk";
import { exhaustiveSwitchCases } from "../lib/exhaustiveSwitchCases";

@Injectable()
export class PingService {
    constructor(
        @Inject(appConfig.KEY)
        private readonly appConfiguration: ConfigType<typeof appConfig>,
    ) {}

    async getPing(): Promise<ResponseBody<GetPingSuccessResponseData>> {
        return {
            status: "success",
            message: "Ping!",
            data: {
                environment: this.appConfiguration.deployment.environment,
            },
        };
    }

    async postPing(dto: PostPingDto): Promise<ResponseBody<GetPingSuccessResponseData>> {
        switch (dto.message) {
            case "Ping!": {
                return {
                    status: "success",
                    message: "Pong!",
                    data: {
                        environment: this.appConfiguration.deployment.environment,
                    },
                };
            }
            case "Pong!": {
                return {
                    status: "success",
                    message: "Ping!",
                    data: {
                        environment: this.appConfiguration.deployment.environment,
                    },
                };
            }
            default: {
                exhaustiveSwitchCases(dto.message);
            }
        }
    }
}
