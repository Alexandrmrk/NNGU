import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: String(process.env.POSTGRES_HOST),
  port: Number(process.env.POSTGRES_PORT),
  username: String(process.env.POSTGRES_USER),
  password: String(process.env.POSTGRES_PASSWORD),
  database: String(process.env.POSTGRES_DB),
  synchronize: false,
  cache: false,
  entities: ['models/database/entity/**/*.ts'],
  migrations: ['models/database/migrations/**/*.ts'],
});
