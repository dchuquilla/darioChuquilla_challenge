import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import * as request from 'supertest';
import { OrganizacionModule } from './organizacion/organizacion.module';

describe('OrganizacionController (e2e)', () => {
  let app: INestApplication;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, OrganizacionModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('orgranizaciones CRUD', async () => {
    const server = request(app.getHttpServer());

    const currentGetAllRequest = await server.get('/organizacion').expect(200);
    const currentSize = currentGetAllRequest.body.length;

    const newOrganizacion = {
      name: 'Pichincha',
      state: 605,
    };

    const newOrganizacionRequest = await server.post('organizacion').type('form')
    .send(newOrganizacion).expect(201);
    expect(newOrganizacionRequest.body.name).toBe(newOrganizacion.name);
    expect(newOrganizacionRequest.body.id).toBe(currentSize + 1);
    const postNewRequest = await server.get('/organizacion').expect(200);
    const postNewSize = postNewRequest.body.length;
    expect(postNewSize).toBe(currentSize + 1);

    const idOrganizacion = newOrganizacionRequest.body.idOrganizacion;
    const getOrganizacionByIdRequest = await server.get(`/organizacion/${idOrganizacion}`).expect(200);
    expect(getOrganizacionByIdRequest.body.id).toBe(idOrganizacion);

    const updateOrganizacion = {
      idOrganizacion: parseInt(newOrganizacionRequest.body.idOrganizacion),
      name: 'BP',
      state: 606
    };
    const updateOrganizacionRequest = await server.put(`/organizacion/${updateOrganizacion.idOrganizacion}`)
    .expect(200).type('form').send(updateOrganizacion);
    expect(updateOrganizacionRequest.body.name).toEqual(updateOrganizacion.name);

    await server.delete(`/organizacion/${updateOrganizacion.idOrganizacion}`).expect(200);
    const postDeleteGetAllRequest = await server.get('/organizacion').expect(200);
    const postDeleteSize = postDeleteGetAllRequest.body.length;
    expect(postDeleteSize).toBe(currentSize);
  });
});
