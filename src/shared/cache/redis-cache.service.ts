import { Logger } from '@nestjs/common';
import { CacheService } from './cache.interface';
import { Redis } from 'ioredis';

export class RedisCacheService implements CacheService {
  private readonly logger = new Logger(RedisCacheService.name);

  constructor(private readonly redis: Redis) {}

  async get<T>(key: string): Promise<T | null> {
    this.logger.debug(`Getting cache entry for key: ${key}`);
    const rawValue = await this.redis.get(key);

    if (!rawValue) {
      this.logger.debug(`Cache miss for key: ${key}`);
      return null;
    }

    try {
      const parsed: unknown = JSON.parse(rawValue);
      this.logger.debug(`Cache hit for key: ${key}`);
      return parsed as T;
    } catch {
      // If parsing fails, remove corrupted cache entry
      await this.redis.del(key);
      this.logger.debug(`Corrupted cache entry for key: ${key} deleted`);
      return null;
    }
  }

  async set<T>(key: string, value: T, ttlSeconds?: number): Promise<void> {
    this.logger.debug(
      `Setting cache entry for key: ${key} with TTL: ${ttlSeconds ?? 'none'}`,
    );
    const serialized = JSON.stringify(value);

    if (ttlSeconds) {
      this.logger.debug(`Setting cache entry for key: ${key} with expiration`);
      await this.redis.set(key, serialized, 'EX', ttlSeconds);
    } else {
      this.logger.debug(
        `Setting cache entry for key: ${key} without expiration`,
      );
      await this.redis.set(key, serialized);
    }
  }

  async del(key: string): Promise<void> {
    await this.redis.del(key);
    this.logger.debug(`Deleted cache entry for key: ${key}`);
  }
}
