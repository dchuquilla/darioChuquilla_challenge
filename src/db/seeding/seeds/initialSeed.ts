import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Organization } from './../../../../src/organization/entities/organization.entity';
import { Tribe } from './../../../../src/tribe/entities/tribe.entity';
import { Repository } from './../../../../src/tribe/entities/repository.entity';
import { Metrics } from './../../../../src/tribe/entities/metrics.entity';

export default class InitialDatabaseSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const organizations = await factory(Organization)().createMany(5);

    const tribes = await factory(Tribe)()
      .map(async (tribe) => {
        tribe.organization =
          organizations[Math.floor(Math.random() * organizations.length)];
        return tribe;
      })
      .createMany(20);

    const repositories = await factory(Repository)().map(async (repository) => {
      repository.tribe = tribes[Math.floor(Math.random() * tribes.length)];
      return repository;
    }).createMany(60);

    await factory(Metrics)().map(async (metrics) => {
      metrics.idRepository = repositories[Math.floor(Math.random() * repositories.length)].id;
      metrics.repository = repositories[Math.floor(Math.random() * repositories.length)];
      return metrics;
    }).createMany(60);
  }
}
