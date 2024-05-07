import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class FormatUserIdVote1715043262053 {
    name = 'FormatUserIdVote1715043262053'

    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "vote" DROP COLUMN "userId"
        `);
        await queryRunner.query(`
            ALTER TABLE "vote"
            ADD "userId" uuid NOT NULL
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "vote" DROP COLUMN "userId"
        `);
        await queryRunner.query(`
            ALTER TABLE "vote"
            ADD "userId" integer NOT NULL
        `);
    }
}
