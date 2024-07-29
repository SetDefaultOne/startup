import { JwtModuleOptions, JwtOptionsFactory } from "@nestjs/jwt";
import { Inject } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import authConfig from "./auth.config";

export class JwtConfigService implements JwtOptionsFactory {
    constructor(
        @Inject(authConfig.KEY)
        private readonly authConfiguration: ConfigType<typeof authConfig>,
    ) {}

    createJwtOptions(): JwtModuleOptions {
        return {
            secret: this.authConfiguration.jwt.secret,
        };
    }
}
