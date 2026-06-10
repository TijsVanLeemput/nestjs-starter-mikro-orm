import { faker } from '@faker-js/faker';
import { EntityManager } from '@mikro-orm/core';
import { Test, TestingModule } from '@nestjs/testing';
import { mock, mockDeep } from 'jest-mock-extended';

import { TodoRepository } from '@libs/mikro-orm/repositories';
import { Todo } from '../../mikro-orm/entities';
import { CreateTodoRequestBody } from './dto/create-todo.dto';
import { UpdateTodoRequestBody } from './dto/update-todo.dto';
import { TodoNotFoundException } from './todos.exceptions';
import { TodosService } from './todos.service';

describe('TodosService', () => {
  let todosService: TodosService;
  let todoRepository: TodoRepository;

  beforeEach(async () => {
    // Mock the EntityManager
    const mockEntityManager = mockDeep<EntityManager>();

    // Create a mock TodoRepository
    const mockTodoRepository = mockDeep<TodoRepository>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: TodoRepository,
          useValue: mockTodoRepository,
        },
        {
          provide: EntityManager,
          useValue: mockEntityManager,
        },
      ],
    }).compile();

    todosService = module.get<TodosService>(TodosService);
    todoRepository = module.get<TodoRepository>(TodoRepository);
  });

  describe('create', () => {
    it('should return a todo', async () => {
      const todo = mock<Todo>();

      jest.spyOn(todoRepository, 'create').mockResolvedValue(todo);

      const result = await todosService.create(mock<CreateTodoRequestBody>());

      expect(result).toEqual(todo);
      expect(todoRepository.create).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return todos', async () => {
      const todos = mock<Todo[]>();

      jest.spyOn(todoRepository, 'findAll').mockResolvedValue(todos);

      const result = await todosService.getAll();

      expect(result).toEqual(todos);
      expect(todoRepository.getAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a todo', async () => {
      const todo = mock<Todo>();
      const id = faker.string.uuid();

      jest.spyOn(todoRepository, 'findById').mockResolvedValue(todo);

      const result = await todosService.getById(id);

      expect(result).toEqual(todo);
      expect(todoRepository.getById).toHaveBeenCalledWith(id);
    });

    it('should throw an error if no todo exists', async () => {
      const id = faker.string.uuid();

      jest.spyOn(todoRepository, 'findById').mockResolvedValue(null);

      await expect(todosService.getById(id)).rejects.toThrow(
        TodoNotFoundException,
      );
      expect(todoRepository.getById).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should return the updated todo', async () => {
      const todo = mock<Todo>();
      const id = faker.string.uuid();
      const updateData = mock<UpdateTodoRequestBody>();

      // Mock the repository methods
      jest.spyOn(todoRepository, 'findById').mockResolvedValue(todo);
      jest.spyOn(todoRepository, 'update').mockResolvedValue(undefined);
      jest.spyOn(todoRepository, 'findById').mockResolvedValue(todo);

      const result = await todosService.update(id, updateData);

      expect(result).toEqual(todo);
      expect(todoRepository.getById).toHaveBeenCalledWith(id);
      expect(todoRepository.update).toHaveBeenCalledWith(id, updateData);
    });
  });

  describe('remove', () => {
    it('should return the removed todo', async () => {
      const todo = mock<Todo>();
      const id = faker.string.uuid();

      jest.spyOn(todoRepository, 'findById').mockResolvedValue(todo);
      jest.spyOn(todoRepository, 'delete').mockResolvedValue(undefined);

      const result = await todosService.delete(id);

      expect(result).toEqual(todo);
      expect(todoRepository.getById).toHaveBeenCalledWith(id);
      expect(todoRepository.delete).toHaveBeenCalledWith(id);
    });
  });
});
