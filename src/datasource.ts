import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: 'cockroachdb',
  url: process.env.DATABASE_URL,
  ssl: true,
  extra: {
    options: '--cluster=dario-chuquilla-db-392',
  },
});
