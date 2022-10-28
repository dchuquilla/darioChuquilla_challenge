import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import * as request from 'supertest';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';
import { MockServiceService } from 'src/mock-service/mock-service.service';
import { UpdateDateColumn } from 'typeorm';
import exp from 'constants';

describe('OrganizationController', () => {
  let organizationController: OrganizationController;
  let organizationService: OrganizationService;

  const mockOrganizationService = {
    create: jest.fn((dto) => {
      return {
        id: 1,
        ...dto,
      };
    }),
    findAll: jest.fn(() => {
      return [
        {
          id: 1,
          name: 'Pichincha',
          status: 604,
        },
        {
          id: 2,
          name: 'De una',
          status: 604,
        },
      ];
    }),
    findOne: jest.fn((id) => {
      return { id: 1, name: 'Pichincha', status: 604, };
    }),
    update: jest.fn().mockImplementation((id, dto) => ({ id, ...dto })),
    remove: jest.fn((id) => {
      return { id: 1, name: 'Pichincha', status: 604, };
    }),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationController],
      providers: [OrganizationService],
    })
      .overrideProvider(OrganizationService)
      .useValue(mockOrganizationService)
      .compile();

    organizationService =
      moduleRef.get<OrganizationService>(OrganizationService);
    organizationController = moduleRef.get<OrganizationController>(
      OrganizationController,
    );
  });

  describe('findAll', () => {
    const result = [
        {
          id: 1,
          name: 'Pichincha',
          status: 604,
        },
        {
          id: 2,
          name: 'De una',
          status: 604,
        },
      ];
    it('Should return and array of organizations', () => {
      expect(organizationController.findAll()).toEqual(result);
      expect(mockOrganizationService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    const dto = { id: 1, name: 'Pichincha', status: 604 };
    it('should return one organization', () => {
      expect(organizationController.findOne(String(dto.id))).toEqual(dto)
      expect(mockOrganizationService.findOne).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    const dto = { name: 'Pichincha', status: 604 };
    it('should create a new organization', () => {
      expect(organizationController.create(dto)).toEqual({
        id: expect.any(Number),
        name: dto.name,
        status: dto.status,
      });
      expect(mockOrganizationService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('update', () => {
    const dto = { name: 'Bco Pichincha', status: 605 };
    it('should update an organization information', () => {
      expect(organizationController.update('1', dto)).toEqual({
        id: 1,
        ...dto
      });
      expect(mockOrganizationService.update).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    const dto = { id: 1, name: 'Pichincha', status: 604 };
    it('should remove an organization', () => {
      expect(organizationController.remove(String(1))).toEqual(dto);
      expect(organizationService.remove).toHaveBeenCalled();
    });
  });
});
