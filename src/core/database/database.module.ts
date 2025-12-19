import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '@core/config/environment.variables';

export const entityFiles = '*.entity{.ts,.js}';
export const entitiesPath = [`${__dirname}/../../**/${entityFiles}`];
export const migrationFiles = 'core/database/migration/*{.ts,.js}';
export const migrationsPath = [`${__dirname}/../../${migrationFiles}`];

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<EnvironmentVariables>) => {
        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USER'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
          synchronize: false,
          migrationsRun: false,
          entities: entitiesPath,
          migrations: migrationsPath,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
