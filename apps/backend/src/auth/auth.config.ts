import { registerAs } from "@nestjs/config";
import { CookieOptions } from "express";
import * as process from "node:process";

export const AuthConfigKey = "auth";

export interface AuthConfig {
    jwt: {
        secret: string;
        accessTokenCookieName: string;
        accessTokenExpiry: string;
        refreshTokenCookieName: string;
        refreshTokenExpiry: string;
        cookieOptions: CookieOptions;
    };
}

export default registerAs(
    AuthConfigKey,
    () =>
        ({
            jwt: {
                secret: process.env.JWT_SECRET,
                accessTokenCookieName: "BootstrapBrandAccessToken",
                accessTokenExpiry: "15m",
                refreshTokenCookieName: "BootstrapBrandRefreshToken",
                refreshTokenExpiry: "4h",
                cookieOptions: {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== "development",
                    domain: process.env.NODE_ENV !== "development" ? process.env.HOST : undefined,
                    sameSite: "lax",
                    path: "/",
                },
            },
        }) satisfies AuthConfig,
);
