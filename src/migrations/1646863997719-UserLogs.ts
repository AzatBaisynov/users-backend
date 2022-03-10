import {MigrationInterface, QueryRunner} from "typeorm";

export class UserLogs1646863997719 implements MigrationInterface {
    name = 'UserLogs1646863997719'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("uuid" SERIAL NOT NULL, "email" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "password" character varying NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_951b8f1dfc94ac1d0301a14b7e1" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "user_logs" ("id" SERIAL NOT NULL, "loggedAt" TIMESTAMP NOT NULL DEFAULT now(), "country" character varying, "device" character varying, "userUuid" integer, CONSTRAINT "PK_773dbba6ad8ad2cdecfef243953" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_logs" ADD CONSTRAINT "FK_c889d7acb102e2d655c5f80ba1b" FOREIGN KEY ("userUuid") REFERENCES "users"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_logs" DROP CONSTRAINT "FK_c889d7acb102e2d655c5f80ba1b"`);
        await queryRunner.query(`DROP TABLE "user_logs"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
