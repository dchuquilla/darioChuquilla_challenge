import { define } from 'typeorm-seeding';
import * as Faker from '@ngneat/falso';
import { Metrics } from './../../../../src/tribe/entities/metrics.entity';
import { randFloat, randNumber } from '@ngneat/falso';

define(Metrics, (faker: typeof Faker) => {
  const metrics = new Metrics();

  metrics.coverage = randFloat({ min: 10, max: 100, fraction: 2 });
  metrics.bugs = randNumber({ min: 10, max: 1000 });
  metrics.vulnerabilities = randNumber({ min: 10, max: 1000 });
  metrics.hotspot = randNumber({ min: 10, max: 1000 });
  metrics.code_smells = randNumber({ min: 10, max: 1000 });

  return metrics;
});
