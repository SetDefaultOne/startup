import { IsEnum } from "class-validator";

export enum PingMessage {
    "Ping!" = "Ping!",
    "Pong!" = "Pong!",
}

export class GetPingDto {
    @IsEnum(PingMessage)
    message: PingMessage;
}
