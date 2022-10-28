import { define } from 'typeorm-seeding';
import * as Faker from '@ngneat/falso';
import { Repository } from './../../../../src/tribe/entities/repository.entity';
import { randProduct, randRecentDate } from '@ngneat/falso';

define(Repository, (faker: typeof Faker) => {
  const repository = new Repository();
  const states = ['E', 'D', 'A'];
  const status = ['A', 'I'];

  repository.name = randProduct().title;
  repository.state = states[Math.floor(Math.random() * states.length)];
  repository.createTime = randRecentDate();
  repository.status = status[Math.floor(Math.random() * status.length)];

  return repository;
});
