import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { Todo } from '../../../../mikro-orm/entities';

type CreateTodoData = Omit<Todo, 'deleted' | 'createdAt' | 'updatedAt'>;

@Injectable()
export class TodoRepository {
  constructor(private readonly em: EntityManager) {}

  async findAll(): Promise<Todo[]> {
    return this.em.find(Todo, {});
  }

  async findById(id: string): Promise<Todo | null> {
    return this.em.findOne(Todo, { id });
  }

  async create(data: CreateTodoData): Promise<Todo> {
    const todo = this.em.create(Todo, data as any);
    this.em.persist(todo);
    await this.em.flush();
    return todo;
  }

  async update(id: string, data: Partial<Todo>): Promise<void> {
    await this.em.nativeUpdate(Todo, { id }, data);
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
