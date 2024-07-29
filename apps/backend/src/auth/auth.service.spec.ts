import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { DatabaseModule } from "../database/database.module";
import { CipherModule } from "../cipher/cipher.module";

describe("AuthService", () => {
    let service: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [DatabaseModule, CipherModule],
            providers: [AuthService],
        }).compile();

        service = module.get<AuthService>(AuthService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
