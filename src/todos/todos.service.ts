import { TodoRepository } from '@libs/mikro-orm/repositories';
import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

import {
  CreateTodoRequestBody,
  CreateTodoResponse,
} from './dto/create-todo.dto';
import { GetTodoByIdResponse } from './dto/get-todo.dto';
import { GetAllTodosResponse } from './dto/get-todos.dto';
import {
  UpdateTodoRequestBody,
  UpdateTodoResponse,
} from './dto/update-todo.dto';
import { TodoNotFoundException } from './todos.exceptions';

@Injectable()
export class TodosService {
  constructor(private readonly todoRepository: TodoRepository) {}

  async create(data: CreateTodoRequestBody): Promise<CreateTodoResponse> {
    const id = v4();
    const newTodo = await this.todoRepository.create({
      id,
      ...data,
      completed: false,
    });

    return {
      id: newTodo.id,
      createdAt: newTodo.createdAt.toISOString(),
      updatedAt: newTodo.updatedAt.toISOString(),
      deleted: newTodo.deleted,
      description: newTodo.description,
      completed: newTodo.completed,
    }
  }

  async getAll(): Promise<GetAllTodosResponse[]> {
    const todos = await  this.todoRepository.getAll();
    
    return todos.map((todo)=> ({
      id: todo.id,
      createdAt: todo.createdAt.toISOString(),
      updatedAt: todo.updatedAt.toISOString(),
      deleted: todo.deleted,
      description: todo.description,
      completed: todo.completed
    }));
  }

  async getById(id: string): Promise<GetTodoByIdResponse> {
    const todo = await this.todoRepository.getById(id);

    if (!todo) throw new TodoNotFoundException();

    return todo as unknown as GetTodoByIdResponse;
  }

  async update(
    id: string,
    data: UpdateTodoRequestBody,
  ): Promise<UpdateTodoResponse> {
    const todo = await this.todoRepository.getById(id);
    if (!todo) throw new TodoNotFoundException();

    const updatedTodo = await this.todoRepository.update(id, data);

    return {
      id: updatedTodo.id,
      createdAt: updatedTodo.createdAt.toISOString(),
      updatedAt: updatedTodo.updatedAt.toISOString(),
      deleted: updatedTodo.deleted,
      description: updatedTodo.description,
      completed: updatedTodo.completed,
    };
  }

  async delete(id: string): Promise<void> {
    const todo = await this.todoRepository.getById(id);
    if (!todo) throw new TodoNotFoundException();

    await this.todoRepository.delete(id);
  }
}
