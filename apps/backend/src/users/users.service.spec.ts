import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { DatabaseModule } from "../database/database.module";

describe("UsersService", () => {
    let service: UsersService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [DatabaseModule],
            providers: [UsersService],
        }).compile();

        service = module.get<UsersService>(UsersService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
