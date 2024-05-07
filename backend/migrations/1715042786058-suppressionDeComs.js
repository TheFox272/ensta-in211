import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class SuppressionDeComs1715042786058 {
    name = 'SuppressionDeComs1715042786058'

    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "vote" DROP CONSTRAINT "FK_ad37adcff60fdb9670a97868ab1"
        `);
        await queryRunner.query(`
            ALTER TABLE "vote" DROP CONSTRAINT "FK_f5de237a438d298031d11a57c3b"
        `);
        await queryRunner.query(`
            ALTER TABLE "vote" DROP COLUMN "userId"
        `);
        await queryRunner.query(`
            ALTER TABLE "vote"
            ADD "userId" integer NOT NULL
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "vote" DROP COLUMN "userId"
        `);
        await queryRunner.query(`
            ALTER TABLE "vote"
            ADD "userId" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "vote"
            ADD CONSTRAINT "FK_f5de237a438d298031d11a57c3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "vote"
            ADD CONSTRAINT "FK_ad37adcff60fdb9670a97868ab1" FOREIGN KEY ("commentId") REFERENCES "comment"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }
}
