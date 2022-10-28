import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Organization } from './entities/organization.entity';
import { OrganizationService } from './organization.service';

describe('OrganizationService', () => {
  let service: OrganizationService;

  const mockOrganizationRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest
      .fn()
      .mockImplementation((organization) =>
        Promise.resolve({ id: 1, ...organization }),
      ),
    find: jest.fn().mockImplementation(() =>
      Promise.resolve([
        { id: 1, name: 'Pichincha', status: 604 },
        { id: 2, name: 'De una', status: 604 },
      ]),
    ),
    findOne: jest.fn().mockImplementation((id) =>
      Promise.resolve({
        id: 1,
        name: 'Pichincha',
        status: 604,
      }),
    ),
    update: jest.fn().mockImplementation((id, dto) =>
      Promise.resolve({
        id: id,
        ...dto,
      }),
    ),
    preload: jest.fn().mockImplementation((dto) => dto),
    remove: jest.fn().mockImplementation(id => Promise.resolve({
      id: 1,
      name: 'Pichincha',
      status: 604
    }))
  };

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
    const dto = { name: 'Pichincha', status: 604 };
    expect(await service.create(dto)).toEqual({
      id: expect.any(Number),
      name: dto.name,
      status: dto.status,
    });
  });

  it('should return a list of organizations', async () => {
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
    expect(await service.findAll()).toEqual(result);
  });

  it('should return a single organization', async () => {
    const dto = { id: 1, name: 'Pichincha', status: 604 };
    expect(await service.findOne(dto.id)).toEqual(dto);
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
