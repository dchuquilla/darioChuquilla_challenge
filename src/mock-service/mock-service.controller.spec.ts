import { Test, TestingModule } from '@nestjs/testing';
import { MockServiceController } from './mock-service.controller';
import { MockServiceService } from './mock-service.service';

describe('MockServiceController', () => {
  let controller: MockServiceController;
  let service: MockServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MockServiceController],
      providers: [MockServiceService],
    }).compile();

    controller = module.get<MockServiceController>(MockServiceController);
    service = module.get<MockServiceService>(MockServiceService);
  });

  it('should return a list of Repos with id and state', async () => {
    const listResult = JSON.parse(
      `{ "repositories": [ { "id": 1, "state": 604 }, { "id": 2, "state": 605 }, { "id": 3, "state": 606 } ]}`,
    );
    jest.spyOn(service, 'getRepositories').mockImplementation(() => listResult)

    expect(await controller.getMock()).toMatchObject(listResult);
  });
});
