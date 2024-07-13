import { Test, TestingModule } from "@nestjs/testing";
import { PingService } from "./ping.service";
import { ConfigModule } from "@nestjs/config";
import appConfig from "../app.config";

describe("PingService", () => {
    let service: PingService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ConfigModule.forFeature(appConfig)],
            providers: [PingService],
        }).compile();

        service = module.get<PingService>(PingService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
