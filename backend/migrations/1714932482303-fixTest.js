import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class FixTest1714932482303 {
    name = 'FixTest1714932482303'

    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "playlist_movies_new" DROP CONSTRAINT "FK_e57d5b63d088cfe1e027aaafd2c"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "avatar"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "hash"
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "hash" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "avatar" character varying NOT NULL DEFAULT '["#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000"]'
        `);
        await queryRunner.query(`
            ALTER TABLE "playlist_movies_new"
            ADD CONSTRAINT "FK_e57d5b63d088cfe1e027aaafd2c" FOREIGN KEY ("playlistname") REFERENCES "playlist"("playlistname") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }
}
