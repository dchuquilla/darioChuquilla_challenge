import { Organization } from "./src/organization/entities/organization.entity";
import { Metrics } from "./src/tribe/entities/metrics.entity";
import { Repository } from "./src/tribe/entities/repository.entity";
import { Tribe } from "./src/tribe/entities/tribe.entity";

export default {
  type: 'cockroachdb',
  url: process.env.DATABASE_URL,
  ssl: true,
  extra: {
    options: '--cluster=dario-chuquilla-db-392',
  },
  autoLoadEntities: true,
  synchronize: true,
  entities: [Organization, Tribe, Repository, Metrics],
  seeds: ['src/db/seeding/seeds/**/*{.ts,.js}'],
  factories: ['src/db/seeding/factories/**/*{.ts,.js}'],
};
