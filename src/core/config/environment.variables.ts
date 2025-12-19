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
}
