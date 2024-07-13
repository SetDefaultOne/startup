import { Test, TestingModule } from "@nestjs/testing";
import { PingController } from "./ping.controller";
import { PingService } from "./ping.service";
import { ConfigModule } from "@nestjs/config";
import appConfig from "../app.config";

describe("PingController", () => {
    let controller: PingController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ConfigModule.forFeature(appConfig)],
            controllers: [PingController],
            providers: [PingService],
        }).compile();

        controller = module.get<PingController>(PingController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
