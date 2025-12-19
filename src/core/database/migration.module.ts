import { Module, OnModuleInit, Logger } from '@nestjs/common';
import { MigrationService } from './migration.service';
import { DistributedLockService } from './distributed-lock.service';
import { DatabaseModule } from '@core/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [MigrationService, DistributedLockService],
})
export class MigrationModule implements OnModuleInit {
  private readonly logger = new Logger(MigrationModule.name);

  constructor(private readonly migrationService: MigrationService) {}

  async onModuleInit() {
    this.logger.log('Initializing migrations...');
    await this.migrationService.runMigrationsWithLock();
    this.logger.log('Migrations finished');
  }
}
