import { Body, Controller, Get, Post, VERSION_NEUTRAL } from "@nestjs/common";
import { PingService } from "./ping.service";
import { PostPingDto } from "./dto/post-ping.dto";
import { GetPingSuccessResponseData, ResponseBody } from "@bootstrap-brand/sdk";

@Controller({
    path: "ping",
    version: [VERSION_NEUTRAL, "1"],
})
export class PingController {
    constructor(private readonly pingService: PingService) {}

    @Get()
    async getPing(): Promise<ResponseBody<GetPingSuccessResponseData>> {
        return this.pingService.getPing();
    }

    @Post()
    async postPing(@Body() dto: PostPingDto): Promise<ResponseBody<GetPingSuccessResponseData>> {
        return this.pingService.postPing(dto);
    }
}
