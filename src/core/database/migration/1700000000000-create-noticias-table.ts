import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateNoticiasTable1700000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE noticias (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        titulo VARCHAR(255) NOT NULL,
        descricao TEXT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT now(),
        updated_at TIMESTAMP NOT NULL DEFAULT now()
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS noticias;
    `);
  }
}
