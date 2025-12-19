import { CacheService } from './cache.interface';

type CacheEntry = {
  value: unknown;
  expiresAt?: number;
};

export class InMemoryCacheService implements CacheService {
  private readonly store = new Map<string, CacheEntry>();

  get<T>(key: string): Promise<T | null> {
    const entry = this.store.get(key);

    if (!entry) return Promise.resolve(null);

    if (entry.expiresAt && entry.expiresAt < Date.now()) {
      this.store.delete(key);
      return Promise.resolve(null);
    }

    return Promise.resolve(entry.value as T);
  }

  set<T>(key: string, value: T, ttlSeconds?: number): Promise<void> {
    const expiresAt = ttlSeconds ? Date.now() + ttlSeconds * 1000 : undefined;

    this.store.set(key, { value, expiresAt });
    return Promise.resolve();
  }

  del(key: string): Promise<void> {
    this.store.delete(key);
    return Promise.resolve();
  }
}
