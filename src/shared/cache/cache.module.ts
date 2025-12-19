import { Logger, Module, Provider } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CACHE_SERVICE } from './cache.token';
import { CacheService } from './cache.interface';
import { InMemoryCacheService } from './in-memory-cache.service';
import { RedisCacheService } from './redis-cache.service';
import { Redis } from 'ioredis';

const logger = new Logger('CacheModule');

const cacheProvider: Provider = {
  provide: CACHE_SERVICE,
  inject: [ConfigService],
  useFactory: (configService: ConfigService): CacheService => {
    const driver = configService.get<string>('CACHE_DRIVER', 'memory');

    if (driver === 'redis') {
      logger.log('Using RedisCacheService as cache driver');
      const redis = new Redis({
        host: configService.getOrThrow('REDIS_HOST'),
        port: configService.getOrThrow<number>('REDIS_PORT'),
      });

      return new RedisCacheService(redis);
    }

    logger.log('Using InMemoryCacheService as cache driver');
    return new InMemoryCacheService();
  },
};

@Module({
  imports: [ConfigModule],
  providers: [cacheProvider],
  exports: [CACHE_SERVICE],
})
export class CacheModule {}
