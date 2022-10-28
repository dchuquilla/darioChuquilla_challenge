import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { OrganizationModule } from './../src/organization/organization.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Organization } from './../src/organization/entities/organization.entity';
import {
  mockOrganizationsList,
  mockOrganizationRepository,
  createOrganizationDTO,
  singleOrganization,
  updateOrganizationDTO,
} from './../src/organization/test/organization.mock';

describe('OrganizationController (e2e)', () => {
  let app: INestApplication;
  let server: any;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [OrganizationModule],
    })
      .overrideProvider(getRepositoryToken(Organization))
      .useValue(mockOrganizationRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    server = app.getHttpServer();
  });

  it('/organization (GET)', () => {
    return request(server)
      .get('/organization')
      .expect('Content-type', /json/)
      .expect(200).expect( mockOrganizationsList )
  });

  it('/organization (POST)', () => {
    return request(server)
      .post('/organization')
      .send(createOrganizationDTO)
      .expect('Content-type', /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual({
          id: expect.any(Number),
          ...createOrganizationDTO,
        });
      });
  });

  it('/organization (POST) --> return 400 on validation failed', () => {
    return request(server)
      .post('/organization')
      .send({ name: 'Bad Organization', status: 600 })
      .expect('Content-type', /json/)
      .expect(400, {
        statusCode: 400,
        message: ['status must be one of the following values: 604, 605, 606'],
        error: 'Bad Request',
      });
  });

  it('/organization/:id (GET)', () => {
    return request(server)
      .get(`/organization/${singleOrganization.id}`)
      .expect('Content-type', /json/)
      .expect(200, singleOrganization);
  });

  it('/organization/:id (PATCH)', () => {
    return request(server)
      .patch(`/organization/${singleOrganization.id}`)
      .send(updateOrganizationDTO)
      .expect('Content-type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({
          id: expect.any(Number),
          ...updateOrganizationDTO,
        });
      });
  });

  it('/organization/:id (DELETE)', () => {
    return request(server)
      .delete(`/organization/${singleOrganization.id}`)
      .expect('Content-type', /json/)
      .expect(200, singleOrganization);
  });

});
