import 'dotenv/config';
import { DataSource } from 'typeorm';
import { createDatabaseConfig } from './database.config';

export default new DataSource(createDatabaseConfig(process.env));
