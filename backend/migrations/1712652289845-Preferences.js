import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class Preferences1712652289845 {
    name = 'Preferences1712652289845'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "preferences" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "movieId" integer NOT NULL,
                "film_name" character varying NOT NULL,
                "date" character varying NOT NULL,
                "rate" integer NOT NULL DEFAULT '0',
                "review" character varying NOT NULL,
                CONSTRAINT "PK_17f8855e4145192bbabd91a51be" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "preferences"
            ADD CONSTRAINT "FK_c7db48b85d989844171b75a12d9" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "preferences" DROP CONSTRAINT "FK_c7db48b85d989844171b75a12d9"
        `);
        await queryRunner.query(`
            DROP TABLE "preferences"
        `);
    }
}
