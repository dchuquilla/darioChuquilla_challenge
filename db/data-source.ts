import { DataSource, DataSourceOptions } from 'typeorm';
import { URL } from 'url';

const dbUrl = new URL(process.env.DATABASE_URL);
const routingId = dbUrl.searchParams.get("options");
dbUrl.searchParams.delete("options");

export const AppDataSourceOptions: DataSourceOptions = {
  type: 'cockroachdb',
  url: dbUrl.toString(),
  ssl: true,
  extra: {
    options: routingId,
  },
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
};

const AppDataSource = new DataSource(AppDataSourceOptions);
export default AppDataSource;
