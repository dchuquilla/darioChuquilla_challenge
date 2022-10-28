import { define } from 'typeorm-seeding';
import * as Faker from '@ngneat/falso';
import { Tribe } from './../../../../src/tribe/entities/tribe.entity';
import { randFootballTeam, randNumber } from '@ngneat/falso';

define(Tribe, (faker: typeof Faker) =>{
  const tribe = new Tribe();
  tribe.name = randFootballTeam();
  tribe.status = randNumber({ min: 10, max: 1000 });
  return tribe;
});
