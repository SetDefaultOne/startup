import { Injectable, Logger } from "@nestjs/common";
import { CipherService } from "../cipher/cipher.service";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { User } from "../users/user.entity";

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(
        private readonly dataSource: DataSource,
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        private readonly cipherService: CipherService,
    ) {}
}
