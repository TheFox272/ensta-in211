import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class Hash1714916001609 {
    name = 'Hash1714916001609'

    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "hash" character varying
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "hash"
        `);
    }
}
