import { Test, TestingModule } from "@nestjs/testing";
import { CipherService } from "./cipher.service";
import { ConfigModule } from "@nestjs/config";
import cipherConfig from "./cipher.config";

describe("CipherService", () => {
    let service: CipherService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ConfigModule.forFeature(cipherConfig)],
            providers: [CipherService],
        }).compile();

        service = module.get<CipherService>(CipherService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
