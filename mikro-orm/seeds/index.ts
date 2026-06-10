import 'reflect-metadata';

// config();

import { MikroORM } from '@mikro-orm/core';

import ormConfig from '../../mikro-orm.config';
import { seedTodos } from './todos';

async function main(): Promise<void> {
  const orm = await MikroORM.init(ormConfig);
  const em = orm.em.fork();

  console.log('Running seeds...');
  await seedTodos(em);
  console.log('Seeds completed!');

  // Don't explicitly close ORM - just let the process exit
  // This avoids connection cleanup errors that occur on shutdown
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
  });
