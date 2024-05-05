import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class Ok1714926418097 {
    name = 'Ok1714926418097'

    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "avatar" character varying DEFAULT '["#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000"]'
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "hash" character varying
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "hash"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "avatar"
        `);
    }
}
