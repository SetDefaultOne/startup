import { Body, Controller, Get, Logger, NotFoundException, Param, ParseUUIDPipe, Post, Query } from "@nestjs/common";
import { UsersService } from "./users.service";
import {
    CreateUserSuccessResponseData,
    GetUsersSuccessResponseData,
    GetUserSuccessResponseData,
    QueryErrorBody,
    QueryResponse,
} from "@bootstrap-brand/sdk";
import { CreateUserDto } from "./dto/createUser.dto";

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
            throw new NotFoundException({
                status: "error",
                message: "User not found.",
                data: null,
                code: "E-U4040",
            } satisfies QueryErrorBody);
        }

        return {
            status: "success",
            data: user,
        };
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<QueryResponse<CreateUserSuccessResponseData>> {
        const user = await this.usersService.createUser(createUserDto);

        return {
            status: "success",
            data: user,
        };
    }
}
