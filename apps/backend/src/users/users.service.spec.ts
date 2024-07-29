import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { DatabaseModule } from "../database/database.module";
import { CipherModule } from "../cipher/cipher.module";

describe("UsersService", () => {
    let service: UsersService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [DatabaseModule, CipherModule],
            providers: [UsersService],
        }).compile();

        service = module.get<UsersService>(UsersService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
