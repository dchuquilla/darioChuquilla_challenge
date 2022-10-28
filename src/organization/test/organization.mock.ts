export const mockOrganizationsList = [
  { id: 1, name: 'Pichincha', status: 604 },
  { id: 2, name: 'De una', status: 604 },
];

export const singleOrganization = { id: 1, name: 'Pichincha', status: 604 };

export const createOrganizationDTO = { name: 'Pichincha', status: 604 };
export const updateOrganizationDTO = { name: 'Pichincha N', status: 605 };

export const mockOrganizationRepository = {
  create: jest.fn().mockImplementation((dto) => dto),
  save: jest
    .fn()
    .mockImplementation((organization) =>
      Promise.resolve({ id: 1, ...organization }),
    ),
  find: jest
    .fn()
    .mockImplementation(() => Promise.resolve(mockOrganizationsList)),
  findOne: jest
    .fn()
    .mockImplementation((id) => Promise.resolve(singleOrganization)),
  update: jest.fn().mockImplementation((id, dto) =>
    Promise.resolve({
      id: id,
      ...dto,
    }),
  ),
  preload: jest.fn().mockImplementation((dto) => dto),
  remove: jest
    .fn()
    .mockImplementation((id) => Promise.resolve(singleOrganization)),
};
