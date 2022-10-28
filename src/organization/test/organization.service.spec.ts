import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Organization } from '../entities/organization.entity';
import { OrganizationService } from '../organization.service';
import {
  mockOrganizationsList,
  mockOrganizationRepository,
  createOrganizationDTO,
  singleOrganization,
} from './organization.mock';

describe('OrganizationService', () => {
  let service: OrganizationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrganizationService,
        {
          provide: getRepositoryToken(Organization),
          useValue: mockOrganizationRepository,
        },
      ],
    }).compile();

    service = module.get<OrganizationService>(OrganizationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new organization', async () => {
    expect(await service.create(createOrganizationDTO)).toEqual({
      id: expect.any(Number),
      ...createOrganizationDTO,
    });
  });

  it('should return a list of organizations', async () => {
    expect(await service.findAll()).toEqual(mockOrganizationsList);
  });

  it('should return a single organization', async () => {
    expect(await service.findOne(singleOrganization.id)).toEqual(singleOrganization);
  });

  it('should update an organization', async () => {
    const id = 1;
    const dto = { name: 'Pichincha N', status: 605 };
    expect(await service.update(id, dto)).toEqual({
      id: id,
      ...dto,
    });
  });

  it('should remove an organization', async () => {
    const dto = { id: 1, name: 'Pichincha', status: 604 };
    expect(await service.remove(dto.id)).toEqual(dto);
  });
});
