import { UnauthorizedException } from "@nestjs/common";
import { QueryErrorBody } from "@bootstrap-brand/sdk";

export default class UserNotSignedInException extends UnauthorizedException {
    constructor() {
        super({
            status: "error",
            message: "User is not signed in.",
            data: null,
            code: "E-A4011",
        } satisfies QueryErrorBody);
    }
}
