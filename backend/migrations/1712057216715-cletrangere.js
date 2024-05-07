import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class Cletrangere1712057216715 {
    name = 'Cletrangere1712057216715'

    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "comment" DROP CONSTRAINT "FK_aea4918c888422550a85e257894"
        `);
        await queryRunner.query(`
            ALTER TABLE "comment"
            ALTER COLUMN "movieId"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "comment"
            ADD CONSTRAINT "FK_aea4918c888422550a85e257894" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "comment" DROP CONSTRAINT "FK_aea4918c888422550a85e257894"
        `);
        await queryRunner.query(`
            ALTER TABLE "comment"
            ALTER COLUMN "movieId" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "comment"
            ADD CONSTRAINT "FK_aea4918c888422550a85e257894" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }
}
