import { Module, Provider } from '@nestjs/common';
import { CACHE_SERVICE } from './cache.token';
import { InMemoryCacheService } from './in-memory-cache.service';
import { ConfigService } from '@nestjs/config';

const cacheProvider: Provider = {
  provide: CACHE_SERVICE,
  inject: [ConfigService],
  useFactory: () => {
    return new InMemoryCacheService();
  },
};

@Module({
  providers: [cacheProvider],
  exports: [CACHE_SERVICE],
})
export class CacheModule {}
