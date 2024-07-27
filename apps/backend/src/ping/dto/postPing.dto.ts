import { IsIn } from "class-validator";
import { PingMessage, pingMessages, PostPingRequestBody } from "@bootstrap-brand/sdk";

export class PostPingDto implements PostPingRequestBody {
    @IsIn(pingMessages)
    message: PingMessage;
}
