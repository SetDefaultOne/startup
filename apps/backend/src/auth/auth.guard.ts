import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request, Response } from "express";
import authConfig from "./auth.config";
import { ConfigType } from "@nestjs/config";
import { UserAccessToken } from "./types/userAccessToken";
import { UserRefreshToken } from "./types/userRefreshToken";
import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service";
import UserNotSignedInException from "./errors/userNotSignedInException";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        @Inject(authConfig.KEY)
        private readonly authConfiguration: ConfigType<typeof authConfig>,
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const accessToken = this.extractAccessToken(request);

        if (accessToken) {
            let userAccessToken: UserAccessToken | null = null;

            try {
                userAccessToken = await this.jwtService.verifyAsync<UserAccessToken>(accessToken, {
                    secret: this.authConfiguration.jwt.secret,
                });
            } catch {}

            if (userAccessToken) {
                request["accessToken"] = userAccessToken;

                return true;
            }
        }

        const refreshToken = this.extractRefreshToken(request);

        if (!refreshToken) {
            throw new UserNotSignedInException();
        }

        let userRefreshToken: UserRefreshToken;

        try {
            userRefreshToken = await this.jwtService.verifyAsync<UserRefreshToken>(refreshToken);
        } catch {
            throw new UserNotSignedInException();
        }

        const user = await this.usersService.getUser(userRefreshToken.sub);

        if (!user) {
            throw new UserNotSignedInException();
        }

        if (user.authRefreshSerial !== userRefreshToken.serial) {
            throw new UserNotSignedInException();
        }

        const refreshedAccessToken = await this.authService.createAccessToken(user);

        const response = context.switchToHttp().getResponse<Response>();

        const { accessTokenCookieName, cookieOptions } = this.authConfiguration.jwt;

        response.cookie(accessTokenCookieName, refreshedAccessToken, cookieOptions);

        request["accessToken"] = {
            sub: user.uuid,
        } satisfies UserAccessToken;

        return true;
    }

    private extractAccessToken(request: Request): string | undefined {
        let accessToken;

        const { accessTokenCookieName } = this.authConfiguration.jwt;

        if (request.headers.authorization) {
            const [headerType, headerValue] = request.headers.authorization?.split(" ") ?? [];

            if (headerType === "Bearer") accessToken = headerValue;
        } else if (request.cookies[accessTokenCookieName]) {
            accessToken = request.cookies[accessTokenCookieName];
        }

        return accessToken;
    }

    private extractRefreshToken(request: Request): string | undefined {
        return request.cookies[this.authConfiguration.jwt.refreshTokenCookieName];
    }
}
