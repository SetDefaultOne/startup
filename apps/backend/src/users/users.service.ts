import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { User } from "./user.entity";

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async getUsers({ username, limit = 10 }: { username: string; limit?: number }): Promise<User[]> {
        return await this.usersRepository.find({
            where: {
                username: ILike("%" + username + "%"),
            },
            order: { username: "asc" },
            take: limit,
            cache: true,
        });
    }

    async getUser(uuid: string): Promise<User | null> {
        return await this.usersRepository.findOneBy({ uuid });
    }
}
