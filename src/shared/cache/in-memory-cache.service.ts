import { Logger } from '@nestjs/common';
import { CacheService } from './cache.interface';

type CacheEntry = {
  value: unknown;
  expiresAt?: number;
};

export class InMemoryCacheService implements CacheService {
  private readonly logger = new Logger(InMemoryCacheService.name);

  private readonly store = new Map<string, CacheEntry>();

  get<T>(key: string): Promise<T | null> {
    this.logger.debug(`Getting cache entry for key: ${key}`);

    const entry = this.store.get(key);

    if (!entry) return Promise.resolve(null);

    if (entry.expiresAt && entry.expiresAt < Date.now()) {
      this.logger.debug(`Cache entry for key: ${key} has expired`);
      this.store.delete(key);
      return Promise.resolve(null);
    }

    this.logger.debug(`Cache hit for key: ${key}`);

    return Promise.resolve(entry.value as T);
  }

  set<T>(key: string, value: T, ttlSeconds?: number): Promise<void> {
    this.logger.debug(
      `Setting cache entry for key: ${key} with TTL: ${ttlSeconds ?? 'none'}`,
    );
    const expiresAt = ttlSeconds ? Date.now() + ttlSeconds * 1000 : undefined;

    this.store.set(key, { value, expiresAt });
    this.logger.debug(`Cache entry set for key: ${key}`);
    return Promise.resolve();
  }

  del(key: string): Promise<void> {
    this.store.delete(key);
    this.logger.debug(`Deleted cache entry for key: ${key}`);
    return Promise.resolve();
  }
}
