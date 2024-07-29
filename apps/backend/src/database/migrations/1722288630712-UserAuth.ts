import { MigrationInterface, QueryRunner } from "typeorm";

export class UserAuth1722288630712 implements MigrationInterface {
    name = "UserAuth1722288630712";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "auth_refresh_serial" integer NOT NULL DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "auth_refresh_serial"`);
    }
}
