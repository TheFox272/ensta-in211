import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class AddAvatar1714461660923 {
    name = 'AddAvatar1714461660923'

    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "avatar" character varying NOT NULL DEFAULT '["#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000"]'
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "avatar"
        `);
    }
}
