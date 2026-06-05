import { TodoRepository } from '@libs/mikro-orm/repositories';
import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

import {
  CreateTodoRequestBody,
  CreateTodoResponse,
} from './dto/create-todo.dto';
import { FindAllTodosResponse } from './dto/find-all-todos.dto';
import { FindOneTodoResponse } from './dto/find-one-todos.dto';
import { RemoveTodoResponse } from './dto/remove-todo.dto';
import {
  UpdateTodoRequestBody,
  UpdateTodoResponse,
} from './dto/update-todo.dto';
import { TodoNotFoundException } from './todos.exceptions';

@Injectable()
export class TodosService {
  constructor(private readonly todoRepository: TodoRepository) {}

  create(data: CreateTodoRequestBody): Promise<CreateTodoResponse> {
    const id = v4();
    return this.todoRepository.create({
      id,
      ...data,
      completed: false,
    });
  }

  findAll(): Promise<FindAllTodosResponse[]> {
    return this.todoRepository.findAll();
  }

  async findOne(id: string): Promise<FindOneTodoResponse> {
    const todo = await this.todoRepository.findById(id);

    if (!todo) throw new TodoNotFoundException();

    return todo;
  }

  async update(
    id: string,
    data: UpdateTodoRequestBody,
  ): Promise<UpdateTodoResponse> {
    const todo = await this.todoRepository.findById(id);
    if (!todo) throw new TodoNotFoundException();

    await this.todoRepository.update(id, data);

    // Fetch the updated entity to return it
    const updated = await this.todoRepository.findById(id);
    if (!updated) throw new TodoNotFoundException();

    return updated;
  }

  async remove(id: string): Promise<RemoveTodoResponse> {
    const todo = await this.todoRepository.findById(id);
    if (!todo) throw new TodoNotFoundException();

    await this.todoRepository.delete(id);
    return todo;
  }
}
