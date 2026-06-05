import { EntityManager } from '@mikro-orm/core';

import { Todo } from '../entities/todo.entity';

const todos = [
  {
    id: 'f697e707-d4cb-4e63-9628-0719905950e9',
    description: 'Example todo',
    completed: false,
    deleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export async function seedTodos(em: EntityManager): Promise<void> {
  for (const todoData of todos) {
    await em.upsert(Todo, todoData);
  }
}
