import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@core/database/database.module';
import { MigrationModule } from '@core/database/migration.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
      validate: (config) => {
        if (!config.DB_HOST) throw new Error('DB_HOST is required');
        if (!config.DB_USER) throw new Error('DB_USER is required');
        return config;
      },
    }),
    DatabaseModule,
    MigrationModule,
  ],
  providers: [],
  exports: [],
})
export class CoreModule {}
