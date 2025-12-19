import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { EnvironmentVariables } from '@core/config/environment.variables';
import { DistributedLockService } from './distributed-lock.service';

@Injectable()
export class MigrationService {
  private readonly logger = new Logger(MigrationService.name);

  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
    private readonly lockService: DistributedLockService,
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {}

  async runMigrationsWithLock(): Promise<void> {
    const shouldRun = this.configService.get('DB_RUN_MIGRATIONS');
    if (!shouldRun) {
      this.logger.debug('DB_RUN_MIGRATIONS=false, skipping migrations');
      return;
    }

    await this.lockService.withAdvisoryLock(
      this.dataSource,
      this.configService.getOrThrow('DB_MIGRATION_LOCK_ID'),
      this.configService.getOrThrow('DB_MIGRATION_LOCK_MAX_RETRIES'),
      this.configService.getOrThrow('DB_MIGRATION_LOCK_RETRY_DELAY'),
      this.configService.getOrThrow('DB_MIGRATION_LOCK_TIMEOUT'),
      async () => {
        this.logger.debug('Running database migrations...');
        const migrations = await this.dataSource.runMigrations({
          transaction: 'each',
        });

        if (migrations.length === 0) {
          this.logger.debug('No pending migrations');
          return;
        }

        migrations.forEach((m) =>
          this.logger.debug(`Migration executed: ${m.name}`),
        );
      },
    );
  }
}
