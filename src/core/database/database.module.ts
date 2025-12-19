import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '@core/config/environment.variables';
import { createDatabaseConfig } from './database.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<EnvironmentVariables>) =>
        createDatabaseConfig({
          DB_HOST: configService.getOrThrow('DB_HOST'),
          DB_PORT: String(configService.getOrThrow('DB_PORT')),
          DB_USER: configService.getOrThrow('DB_USER'),
          DB_PASSWORD: configService.getOrThrow('DB_PASSWORD'),
          DB_NAME: configService.getOrThrow('DB_NAME'),
        }),
    }),
  ],
})
export class DatabaseModule {}
