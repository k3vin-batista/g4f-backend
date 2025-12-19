import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

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
  ],
  providers: [],
  exports: [],
})
export class CoreModule {}
