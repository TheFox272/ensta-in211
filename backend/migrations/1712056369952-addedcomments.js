import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class Addedcomments1712056369952 {
    name = 'Addedcomments1712056369952'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "comment" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "movieId" integer NOT NULL,
                "content" character varying NOT NULL,
                "date" TIMESTAMP NOT NULL,
                "upVotes" integer NOT NULL,
                "downVotes" integer NOT NULL,
                CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "id"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "id" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id")
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "movie" DROP CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "id"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id")
        `);
        await queryRunner.query(`
            DROP TABLE "comment"
        `);
    }
}
