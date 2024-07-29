import { Body, Controller, Get, Logger, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/signIn.dto";
import {
    GetMeSuccessResponseData,
    QueryResponse,
    SignInSuccessResponseData,
    SignOutSuccessResponseData,
    SignUpSuccessResponseData,
} from "@bootstrap-brand/sdk";
import { Request, Response } from "express";
import { SignUpDto } from "./dto/signUp.dto";
import { AuthGuard } from "./auth.guard";
import { UsersService } from "../users/users.service";
import UserNotSignedInException from "./errors/userNotSignedInException";

@Controller({
    path: "auth",
    version: ["1"],
})
export class AuthController {
    private readonly logger = new Logger(AuthController.name);

    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
    ) {}

    @Post("sign-up")
    async signUp(
        @Body() signUpDto: SignUpDto,
        @Res({ passthrough: true }) response: Response,
    ): Promise<QueryResponse<SignUpSuccessResponseData>> {
        const { user, accessToken, refreshToken } = await this.authService.signUp(signUpDto);

        this.authService.addAuthenticationCookies(response, user, accessToken, refreshToken);

        return {
            status: "success",
            message: "Signed up successfully.",
            data: {
                user,
            },
        };
    }

    @Post("sign-in")
    async signIn(
        @Body() signInDto: SignInDto,
        @Res({ passthrough: true }) response: Response,
    ): Promise<QueryResponse<SignInSuccessResponseData>> {
        const { user, accessToken, refreshToken } = await this.authService.signIn(signInDto);

        this.authService.addAuthenticationCookies(response, user, accessToken, refreshToken);

        return {
            status: "success",
            message: "Signed in successfully.",
            data: {
                user,
            },
        };
    }

    @Get("sign-out")
    async signOut(@Res({ passthrough: true }) response: Response): Promise<QueryResponse<SignOutSuccessResponseData>> {
        this.authService.removeAuthenticationCookies(response);

        return {
            status: "success",
            message: "Signed out successfully.",
            data: null,
        };
    }

    @UseGuards(AuthGuard)
    @Get("me")
    async getMe(@Req() request: Request): Promise<QueryResponse<GetMeSuccessResponseData>> {
        if (!request.accessToken) {
            throw new UserNotSignedInException();
        }

        const user = await this.usersService.getUser(request.accessToken.sub);

        if (!user) {
            throw new UserNotSignedInException();
        }

        return {
            status: "success",
            data: user,
        };
    }
}
