import 'reflect-metadata';

import { Migrator } from '@mikro-orm/migrations';
import { defineConfig, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { config } from 'dotenv';

import { Todo } from './mikro-orm/entities';

// Load environment variables
const env = config();

export default defineConfig({
  driver: PostgreSqlDriver,
  clientUrl: env.parsed?.DATABASE_URL,
  // Import entities directly for reliable discovery
  entities: [Todo],
  // Use ReflectMetadataProvider for runtime environments (works better with NestJS)
  // Configure migrations
  migrations: {
    path: 'mikro-orm/migrations',
    pathTs: 'mikro-orm/migrations',
  },
  // Register Migrator extension for CLI support
  extensions: [Migrator],
  metadataCache: {
    enabled: true,
    options: {
      directory: 'mikro-orm/.cache',
    },
  },
});
