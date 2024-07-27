import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "./users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { UsersService } from "./users.service";

describe("UsersController", () => {
    let controller: UsersController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [TypeOrmModule.forFeature([User])],
            providers: [UsersService],
            controllers: [UsersController],
        }).compile();

        controller = module.get<UsersController>(UsersController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});