import { Injectable } from '@nestjs/common';

@Injectable()
export class MockServiceService {
  getRepositories(): object {
    return {
      repositories: [
        { id: 1, state: 604 },
        { id: 2, state: 605 },
        { id: 3, state: 606 },
      ],
    };
  }
}
