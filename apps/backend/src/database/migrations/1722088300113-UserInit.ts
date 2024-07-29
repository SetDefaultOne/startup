import { MigrationInterface, QueryRunner } from "typeorm";

export class UserInit1722088300113 implements MigrationInterface {
    name = "UserInit1722088300113";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('ADMIN', 'USER')`);
        await queryRunner.query(
            `CREATE TABLE "user" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying(24) NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'USER', "password_hash" character varying(60) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_a95e949168be7b7ece1a2382fed" PRIMARY KEY ("uuid"))`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
    }
}
