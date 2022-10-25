import { Controller, Get } from '@nestjs/common';
import { MockServiceService } from './mock-service.service';

@Controller('mock-service')
export class MockServiceController {
  constructor(private readonly mockServiceService: MockServiceService) {}

  @Get()
  getMock(): object {
    return this.mockServiceService.getRepositories();
  }
}
