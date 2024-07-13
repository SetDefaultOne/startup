import { Body, Controller, Get, VERSION_NEUTRAL } from "@nestjs/common";
import { PingService } from "./ping.service";
import { GetPingDto } from "./dto/get-ping.dto";

@Controller({
    path: "ping",
    version: [VERSION_NEUTRAL, "1"],
})
export class PingController {
    constructor(private readonly pingService: PingService) {}

    @Get()
    async getPing(@Body() dto: GetPingDto) {
        return this.pingService.getPing(dto);
    }
}
