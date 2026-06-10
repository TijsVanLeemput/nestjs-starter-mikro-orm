import { EntityManager, wrap } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { Todo } from '../../../../mikro-orm/entities';

type CreateTodoData = Omit<Todo, 'deleted' | 'createdAt' | 'updatedAt'>;

@Injectable()
export class TodoRepository {
  constructor(private readonly em: EntityManager) {}

  async getAll(): Promise<Todo[]> {
    return this.em.find(Todo, {});
  }

  async getById(id: string): Promise<Todo | null> {
    return this.em.findOne(Todo, { id });
  }

  async create(data: CreateTodoData): Promise<Todo> {
    const todo = this.em.create(Todo, data as any);
    this.em.persist(todo);
    await this.em.flush();
    return todo;
  }

  async update(id: string, data: Partial<Todo>): Promise<Todo> {
    const todo = await this.getById(id);
    wrap(todo!).assign(data);
    await this.em.flush();
    return todo!;
  }

  async delete(id: string): Promise<void> {
    const todo = this.em.getReference(Todo, id);
    this.em.remove(todo);
    await this.em.flush();
  }

  async findNonDeleted(): Promise<Todo[]> {
    return this.em.find(Todo, { deleted: false });
  }
}
