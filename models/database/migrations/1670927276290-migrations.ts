import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1670927276290 implements MigrationInterface {
    name = 'migrations1670927276290'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "direction" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, CONSTRAINT "UQ_dabb90f1d6230d1329eaf372031" UNIQUE ("title"), CONSTRAINT "PK_cd7122416e3f733711b5cfa2924" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_directions_direction" ("userId" integer NOT NULL, "directionId" integer NOT NULL, CONSTRAINT "PK_4f0c30e85e00439fe4a0e5a337e" PRIMARY KEY ("userId", "directionId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3d6a9659cdabfa38fd9fd23d79" ON "user_directions_direction" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_505ee0df36f4cc328142de67c0" ON "user_directions_direction" ("directionId") `);
        await queryRunner.query(`ALTER TABLE "user_directions_direction" ADD CONSTRAINT "FK_3d6a9659cdabfa38fd9fd23d79d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_directions_direction" ADD CONSTRAINT "FK_505ee0df36f4cc328142de67c05" FOREIGN KEY ("directionId") REFERENCES "direction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_directions_direction" DROP CONSTRAINT "FK_505ee0df36f4cc328142de67c05"`);
        await queryRunner.query(`ALTER TABLE "user_directions_direction" DROP CONSTRAINT "FK_3d6a9659cdabfa38fd9fd23d79d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_505ee0df36f4cc328142de67c0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3d6a9659cdabfa38fd9fd23d79"`);
        await queryRunner.query(`DROP TABLE "user_directions_direction"`);
        await queryRunner.query(`DROP TABLE "direction"`); 
    }

}
