import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class Test21713460364915 {
    name = 'Test21713460364915'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "playlist_movies" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "playlistname" character varying NOT NULL,
                "movieId" character varying NOT NULL,
                CONSTRAINT "PK_02cd41fcb49896c1f7d5edd6204" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "playlist" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "playlistname" character varying NOT NULL,
                "userId" character varying NOT NULL,
                CONSTRAINT "UQ_65a1cc2e8c38b7a1aeebbe8a304" UNIQUE ("playlistname"),
                CONSTRAINT "PK_538c2893e2024fabc7ae65ad142" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "playlist_movies"
            ADD CONSTRAINT "FK_d4bc02219d5ce48bec97d8e9841" FOREIGN KEY ("playlistname") REFERENCES "playlist"("playlistname") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "playlist_movies" DROP CONSTRAINT "FK_d4bc02219d5ce48bec97d8e9841"
        `);
        await queryRunner.query(`
            DROP TABLE "playlist"
        `);
        await queryRunner.query(`
            DROP TABLE "playlist_movies"
        `);
    }
}
