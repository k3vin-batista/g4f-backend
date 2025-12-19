/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('Noticias - List with pagination and filters (BDD)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    await app.init();

    // Seed data
    await request(app.getHttpServer()).post('/noticias').send({
      titulo: 'Notícia Política',
      descricao: 'Conteúdo sobre política',
    });

    await request(app.getHttpServer()).post('/noticias').send({
      titulo: 'Notícia Economia',
      descricao: 'Conteúdo sobre economia',
    });

    await request(app.getHttpServer()).post('/noticias').send({
      titulo: 'Outra Notícia',
      descricao: 'Conteúdo genérico',
    });
  });

  afterAll(async () => {
    await app.close();
  });

  it('Given existing noticias, when listing with default pagination, then it should return paginated response', async () => {
    const response = await request(app.getHttpServer()).get('/noticias');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body).toHaveProperty('meta');

    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.meta).toHaveProperty('total');
    expect(response.body.meta.page).toBe(1);
    expect(response.body.meta.limit).toBeDefined();
  });

  it('Given page and limit, when listing noticias, then it should respect pagination', async () => {
    const response = await request(app.getHttpServer()).get(
      '/noticias?page=1&limit=2',
    );

    expect(response.status).toBe(200);
    expect(response.body.data.length).toBeLessThanOrEqual(2);
    expect(response.body.meta.page).toBe(1);
    expect(response.body.meta.limit).toBe(2);
  });

  it('Given invalid pagination params, when listing noticias, then it should return 400', async () => {
    const response = await request(app.getHttpServer()).get(
      '/noticias?page=0&limit=-1',
    );

    expect(response.status).toBe(400);
  });
});
