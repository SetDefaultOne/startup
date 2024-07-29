import { ConflictException, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, ILike, QueryFailedError, Repository } from "typeorm";
import { User } from "./user.entity";
import { InjectModel } from "@nestjs/mongoose";
import { MongooseUser } from "./user.schema";
import { Model } from "mongoose";
import { QueryErrorBody } from "@bootstrap-brand/sdk";
import { CreateUserDto } from "./dto/createUser.dto";
import { CipherService } from "../cipher/cipher.service";

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);

    constructor(
        private readonly dataSource: DataSource,
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        @InjectModel(MongooseUser.name)
        private readonly mongooseUserModel: Model<MongooseUser>,
        private readonly cipherService: CipherService,
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

    async createUser(createUserDto: CreateUserDto) {
        try {
            return await this.dataSource.transaction(async (entityManager) => {
                const { username, password } = createUserDto;

                const passwordHash = await this.cipherService.hashPassword(password);

                const user = this.usersRepository.create({
                    username,
                    passwordHash,
                });
                await entityManager.save(user);

                const mongooseUser = await this.mongooseUserModel.create({
                    uuid: user.uuid,
                });
                await mongooseUser.save();

                return user;
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
}
