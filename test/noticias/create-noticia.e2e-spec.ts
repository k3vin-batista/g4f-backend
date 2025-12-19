/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('Noticias - Create (BDD)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    // enable validation in tests
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Given valid payload, when creating a noticia, then it should return 201', async () => {
    const response = await request(app.getHttpServer()).post('/noticias').send({
      titulo: 'Nova Notícia',
      descricao: 'Descrição da notícia',
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.titulo).toBe('Nova Notícia');
  });

  it('Given invalid payload, when creating a noticia, then it should return 400', async () => {
    const response = await request(app.getHttpServer()).post('/noticias').send({
      titulo: '',
    });

    expect(response.status).toBe(400);
  });

  it('Given payload with extra fields, when creating a noticia, then it should return 400', async () => {
    const response = await request(app.getHttpServer()).post('/noticias').send({
      titulo: 'Nova Notícia',
      descricao: 'Descrição válida',
      extraField: 'should not be here',
    });

    expect(response.status).toBe(400);
  });

  it('Given an existing noticia, when deleting it, then it should return 200 and remove the resource', async () => {
    // Arrange: create noticia
    const createResponse = await request(app.getHttpServer())
      .post('/noticias')
      .send({
        titulo: 'Notícia para deletar',
        descricao: 'Descrição da notícia',
      });

    expect(createResponse.status).toBe(201);

    const noticiaId = createResponse.body.id as string;
    expect(noticiaId).toBeDefined();

    // Act: delete noticia
    const deleteResponse = await request(app.getHttpServer()).delete(
      `/noticias/${noticiaId}`,
    );

    expect(deleteResponse.status).toBe(200);

    // Assert: resource no longer exists
    const getResponse = await request(app.getHttpServer()).get(
      `/noticias/${noticiaId}`,
    );

    console.log(noticiaId);

    expect(getResponse.status).toBe(404);
  });
});
