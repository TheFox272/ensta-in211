import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class TableVotes1715034987926 {
    name = 'TableVotes1715034987926'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "vote" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "upOrDown" character varying NOT NULL,
                "commentId" uuid NOT NULL,
                "userId" uuid NOT NULL,
                CONSTRAINT "PK_2d5932d46afe39c8176f9d4be72" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "vote"
            ADD CONSTRAINT "FK_ad37adcff60fdb9670a97868ab1" FOREIGN KEY ("commentId") REFERENCES "comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "vote"
            ADD CONSTRAINT "FK_f5de237a438d298031d11a57c3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "vote" DROP CONSTRAINT "FK_f5de237a438d298031d11a57c3b"
        `);
        await queryRunner.query(`
            ALTER TABLE "vote" DROP CONSTRAINT "FK_ad37adcff60fdb9670a97868ab1"
        `);
        await queryRunner.query(`
            DROP TABLE "vote"
        `);
    }
}
