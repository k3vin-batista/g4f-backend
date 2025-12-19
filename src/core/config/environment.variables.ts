/**
 * Environment variables used by the application.
 *
 * This interface serves as a single source of truth for all
 * environment variables required at application startup.
 *
 */
export interface EnvironmentVariables {
  // Base Configuration
  PORT: number;

  // Postgres Database
  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;

  // Cache Configuration
  CACHE_DRIVER: 'in-memory' | 'redis';
  REDIS_HOST?: string;
  REDIS_PORT?: number;

  // Migrations
  DB_RUN_MIGRATIONS: boolean;
  DB_MIGRATION_LOCK_ID: number;
  DB_MIGRATION_LOCK_MAX_RETRIES: number;
  DB_MIGRATION_LOCK_RETRY_DELAY: number;
  DB_MIGRATION_LOCK_TIMEOUT: number;
}
