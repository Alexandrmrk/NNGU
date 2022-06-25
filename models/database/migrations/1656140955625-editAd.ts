import { MigrationInterface, QueryRunner } from "typeorm";

export class editAd1656140955625 implements MigrationInterface {
    name = 'editAd1656140955625'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ad" ALTER COLUMN "title" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "ad" ALTER COLUMN "description" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "ad" ALTER COLUMN "cost" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "ad" ALTER COLUMN "phone" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "ad" ALTER COLUMN "address" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "ad" ALTER COLUMN "publicDate" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "ad" ALTER COLUMN "viewCount" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "ad" ALTER COLUMN "isVisible" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ad" ALTER COLUMN "isVisible" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "ad" ALTER COLUMN "viewCount" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "ad" ALTER COLUMN "publicDate" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "ad" ALTER COLUMN "address" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "ad" ALTER COLUMN "phone" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "ad" ALTER COLUMN "cost" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "ad" ALTER COLUMN "description" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "ad" ALTER COLUMN "title" DROP DEFAULT`);
    }

}
