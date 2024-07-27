import { Controller, Get, HttpException, HttpStatus, Logger, Param, ParseUUIDPipe, Query } from "@nestjs/common";
import { UsersService } from "./users.service";
import { GetUsersSuccessResponseData, GetUserSuccessResponseData, QueryResponse } from "@bootstrap-brand/sdk";

@Controller({
    path: "users",
    version: ["1"],
})
export class UsersController {
    private readonly logger = new Logger(UsersController.name);

    constructor(private readonly usersService: UsersService) {}

    @Get()
    async getUsers(@Query("username") username: string): Promise<QueryResponse<GetUsersSuccessResponseData>> {
        const users = await this.usersService.getUsers({ username });

        return {
            status: "success",
            data: users,
        };
    }

    @Get(":uuid")
    async getUserByUuid(
        @Param("uuid", ParseUUIDPipe) uuid: string,
    ): Promise<QueryResponse<GetUserSuccessResponseData>> {
        const user = await this.usersService.getUser(uuid);

        if (!user) {
            throw new HttpException(
                {
                    status: "error",
                    message: "User not found.",
                    data: null,
                    code: "E-U4040",
                } satisfies QueryResponse,
                HttpStatus.NOT_FOUND,
            );
        }

        return {
            status: "success",
            data: user,
        };
    }
}
