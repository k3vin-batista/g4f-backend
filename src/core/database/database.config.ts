export const ENTITY_GLOB = '*.entity{.ts,.js}';

export const ENTITIES_PATH = [`${__dirname}/../../**/${ENTITY_GLOB}`];

export const MIGRATIONS_PATH = [`${__dirname}/migration/*{.ts,.js}`];

/**
 * Base database configuration shared between
 * NestJS runtime and TypeORM CLI (migrations).
 */
export const createDatabaseConfig = (env: NodeJS.ProcessEnv) => ({
  type: 'postgres' as const,
  host: env.DB_HOST,
  port: Number(env.DB_PORT),
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  synchronize: false,
  migrationsRun: false,
  entities: ENTITIES_PATH,
  migrations: MIGRATIONS_PATH,
});
