import { ConflictException, Inject, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { CipherService } from "../cipher/cipher.service";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, QueryFailedError, Repository } from "typeorm";
import { User } from "../users/user.entity";
import { SignInDto } from "./dto/signIn.dto";
import { QueryErrorBody, User as SdkUser } from "@bootstrap-brand/sdk";
import { UserAccessToken } from "./types/userAccessToken";
import { JwtService } from "@nestjs/jwt";
import { UserRefreshToken } from "./types/userRefreshToken";
import authConfig from "./auth.config";
import { ConfigType } from "@nestjs/config";
import { SignUpDto } from "./dto/signUp.dto";
import { InjectModel } from "@nestjs/mongoose";
import { MongooseUser } from "../users/user.schema";
import { Model } from "mongoose";
import { Response } from "express";

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(
        private readonly dataSource: DataSource,
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        @InjectModel(MongooseUser.name)
        private readonly mongooseUserModel: Model<MongooseUser>,
        private readonly cipherService: CipherService,
        private readonly jwtService: JwtService,
        @Inject(authConfig.KEY)
        private readonly authConfiguration: ConfigType<typeof authConfig>,
    ) {}

    async signUp(signUpDto: SignUpDto): Promise<{
        user: User;
        accessToken: string;
        refreshToken: string;
    }> {
        try {
            return await this.dataSource.transaction(async (entityManager) => {
                const { username, password } = signUpDto;

                const passwordHash = await this.cipherService.hashPassword(password);

                const user = this.usersRepository.create({
                    username,
                    passwordHash,
                });
                await entityManager.save(user);

                const mongooseUser = new this.mongooseUserModel({
                    uuid: user.uuid,
                });
                await mongooseUser.save();

                const { accessToken, refreshToken } = await this.generateAccessTokenPair(user);

                return {
                    user,
                    accessToken,
                    refreshToken,
                };
            });
        } catch (exception: unknown) {
            if (exception instanceof QueryFailedError) {
                switch (exception.driverError.code) {
                    case "23505": {
                        throw new ConflictException({
                            status: "error",
                            code: "E-U4090",
                            message: "User already exists.",
                            data: null,
                        } satisfies QueryErrorBody);
                    }
                }
            }

            throw exception;
        }
    }

    async signIn(signInDto: SignInDto): Promise<{
        user: User;
        accessToken: string;
        refreshToken: string;
    }> {
        const sdkUserSelect: Record<keyof SdkUser, boolean> = {
            uuid: true,
            username: true,
            createdAt: true,
        };

        const user = await this.usersRepository.findOne({
            where: {
                username: signInDto.username,
            },
            select: {
                ...sdkUserSelect,
                passwordHash: true,
                authRefreshSerial: true,
            },
        });

        const isValidPassword = user
            ? await this.cipherService.compareHashedPassword(signInDto.password, user.passwordHash)
            : false;

        if (!user || !isValidPassword) {
            throw new UnauthorizedException({
                status: "error",
                message: "Invalid credentials.",
                data: null,
                code: "E-A4010",
            } satisfies QueryErrorBody);
        }

        const { accessToken, refreshToken } = await this.generateAccessTokenPair(user);

        return {
            user,
            accessToken,
            refreshToken,
        };
    }

    async generateAccessTokenPair(
        user: User,
        invalidatePrevious = false,
    ): Promise<{
        accessToken: string;
        refreshToken: string;
    }> {
        if (invalidatePrevious) {
            user.authRefreshSerial++;
            await this.usersRepository.save(user);
        }

        const accessTokenPayload: UserAccessToken = {
            sub: user.uuid,
        };

        const refreshTokenPayload: UserRefreshToken = {
            sub: user.uuid,
            serial: user.authRefreshSerial,
        };

        const { accessTokenExpiry, refreshTokenExpiry } = this.authConfiguration.jwt;

        const accessToken = await this.jwtService.signAsync(accessTokenPayload, { expiresIn: accessTokenExpiry });
        const refreshToken = await this.jwtService.signAsync(refreshTokenPayload, { expiresIn: refreshTokenExpiry });

        return {
            accessToken,
            refreshToken,
        };
    }

    async createAccessToken(user: User) {
        const accessTokenPayload: UserAccessToken = {
            sub: user.uuid,
        };

        const { accessTokenExpiry } = this.authConfiguration.jwt;

        return await this.jwtService.signAsync(accessTokenPayload, { expiresIn: accessTokenExpiry });
    }

    addAuthenticationCookies(response: Response, user: User, accessToken: string, refreshToken: string) {
        const { accessTokenCookieName, refreshTokenCookieName, cookieOptions } = this.authConfiguration.jwt;

        response.cookie(accessTokenCookieName, accessToken, cookieOptions);
        response.cookie(refreshTokenCookieName, refreshToken, cookieOptions);
    }

    removeAuthenticationCookies(response: Response) {
        const { accessTokenCookieName, refreshTokenCookieName, cookieOptions } = this.authConfiguration.jwt;

        response.clearCookie(accessTokenCookieName, cookieOptions);
        response.clearCookie(refreshTokenCookieName, cookieOptions);
    }
}
