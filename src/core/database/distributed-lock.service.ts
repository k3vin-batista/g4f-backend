import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DistributedLockService {
  private readonly logger = new Logger(DistributedLockService.name);

  async withAdvisoryLock(
    dataSource: DataSource,
    lockId: number,
    maxRetries: number,
    retryDelay: number,
    lockTimeout: number,
    callback: () => Promise<void>,
  ): Promise<void> {
    let retries = 0;

    while (retries < maxRetries) {
      const [{ pg_try_advisory_lock: locked }] = await dataSource.query(
        'SELECT pg_try_advisory_lock($1)',
        [lockId],
      );

      if (locked) {
        this.logger.log(`Advisory lock acquired: ${lockId}`);

        try {
          await Promise.race([
            callback(),
            new Promise((_, reject) =>
              setTimeout(
                () => reject(new Error('Migration timeout')),
                lockTimeout,
              ),
            ),
          ]);
        } finally {
          await dataSource.query('SELECT pg_advisory_unlock($1)', [lockId]);
          this.logger.log(`Advisory lock released: ${lockId}`);
        }

        return;
      }

      this.logger.warn(`Failed to acquire lock ${lockId}, retrying...`);
      retries++;
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
    }

    throw new Error(
      `Failed to acquire advisory lock after ${maxRetries} retries`,
    );
  }
}
