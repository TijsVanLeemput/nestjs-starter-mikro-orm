import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MikroOrmService {
  constructor(private readonly em: EntityManager) {}

  /**
   * Get the EntityManager instance for direct access to MikroORM operations
   */
  getEntityManager(): EntityManager {
    return this.em;
  }

  /**
   * Get a fork of the EntityManager for isolated operations
   */
  fork() {
    return this.em.fork();
  }
}
