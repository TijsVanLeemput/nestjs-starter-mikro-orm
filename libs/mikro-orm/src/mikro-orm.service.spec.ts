import { EntityManager } from '@mikro-orm/core';
import { Test, TestingModule } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';

import { MikroOrmService } from './mikro-orm.service';

describe('MikroOrmService', () => {
  let service: MikroOrmService;

  beforeEach(async () => {
    const mockEntityManager = mock<EntityManager>();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MikroOrmService,
        {
          provide: EntityManager,
          useValue: mockEntityManager,
        },
      ],
    }).compile();

    service = module.get<MikroOrmService>(MikroOrmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
