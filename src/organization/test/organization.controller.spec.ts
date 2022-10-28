import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationController } from '../organization.controller';
import { OrganizationService } from '../organization.service';
import {
  mockOrganizationsList,
  mockOrganizationRepository,
  createOrganizationDTO,
  singleOrganization,
  updateOrganizationDTO,
} from './organization.mock';

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
      return mockOrganizationsList;
    }),
    findOne: jest.fn((id) => {
      return singleOrganization;
    }),
    update: jest.fn().mockImplementation((id, dto) => ({ id, ...dto })),
    remove: jest.fn((id) => {
      return singleOrganization;
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
    it('Should return and array of organizations', () => {
      expect(organizationController.findAll()).toEqual(mockOrganizationsList);
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
    it('should create a new organization', () => {
      expect(organizationController.create(createOrganizationDTO)).toEqual({
        id: expect.any(Number),
        name: createOrganizationDTO.name,
        status: createOrganizationDTO.status,
      });
      expect(mockOrganizationService.create).toHaveBeenCalledWith(
        createOrganizationDTO,
      );
    });
  });

  describe('update', () => {
    const dto = { name: 'Bco Pichincha', status: 605 };
    it('should update an organization information', () => {
      expect(
        organizationController.update(
          String(singleOrganization.id),
          updateOrganizationDTO,
        ),
      ).toEqual({
        id: singleOrganization.id,
        ...updateOrganizationDTO,
      });
      expect(mockOrganizationService.update).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should remove an organization', () => {
      expect(organizationController.remove(String(singleOrganization.id))).toEqual(
        singleOrganization,
      );
      expect(organizationService.remove).toHaveBeenCalled();
    });
  });
});
