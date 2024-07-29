import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { User } from "./user.entity";
import { PaginationOptions } from "../database/types/paginationOptions";

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);

    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    async getUsers({
        username,
        page = 1,
        size = 10,
        take = 10,
    }: {
        username: string;
    } & PaginationOptions): Promise<User[]> {
        return await this.usersRepository.find({
            where: {
                username: ILike("%" + username + "%"),
            },
            order: { username: "asc" },
            skip: (page - 1) * size,
            take,
            cache: true,
        });
    }

    async getUser(uuid: string): Promise<User | null> {
        return await this.usersRepository.findOneBy({ uuid });
    }
}
