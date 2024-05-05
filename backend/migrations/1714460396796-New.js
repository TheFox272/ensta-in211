import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class New1714460396796 {
    name = 'New1714460396796'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "playlist_movies_new" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "playlistname" character varying NOT NULL,
                "movieId" character varying NOT NULL,
                "userId" character varying NOT NULL,
                CONSTRAINT "PK_e9b40cea2c74a5fb5a8f44d14bc" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "playlist_movies_new"
            ADD CONSTRAINT "FK_e57d5b63d088cfe1e027aaafd2c" FOREIGN KEY ("playlistname") REFERENCES "playlist"("playlistname") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "playlist_movies_new" DROP CONSTRAINT "FK_e57d5b63d088cfe1e027aaafd2c"
        `);
        await queryRunner.query(`
            DROP TABLE "playlist_movies_new"
        `);
    }
}
