import { Controller, Logger } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller({
    path: "auth",
    version: ["1"],
})
export class AuthController {
    private readonly logger = new Logger(AuthController.name);

    constructor(private readonly authService: AuthService) {}
}
