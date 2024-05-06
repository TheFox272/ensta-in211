import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class Auteurdecom1714929214632 {
    name = 'Auteurdecom1714929214632'

    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "comment"
            ADD "author" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "avatar"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "hash"
            SET NOT NULL
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "hash" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "avatar" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "comment" DROP COLUMN "author"
        `);
    }
}
