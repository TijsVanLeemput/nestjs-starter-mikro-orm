import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';


import { type CreateTodoRequestBody, type CreateTodoResponse, CreateTodoResponseDto } from './dto/create-todo.dto';
import { type DeleteTodoRequestParams } from './dto/delete-todo.dto';
import { type GetTodoByIdResponse, GetTodoByIdResponseDto } from './dto/get-todo.dto';
import { type GetAllTodosResponse, GetAllTodosResponseDto } from './dto/get-todos.dto';
import { type UpdateTodoRequestBody, type UpdateTodoRequestParams, type UpdateTodoResponse, UpdateTodoResponseDto } from './dto/update-todo.dto';
import { TodosService } from './todos.service';

@ApiTags('todos')
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Todo successfully created',
    type: CreateTodoResponseDto,
  })
  create(@Body() body: CreateTodoRequestBody): Promise<CreateTodoResponse> {
    return this.todosService.create(body);
  }

  @Get()
  @ApiOkResponse({
    description: 'List of all todos',
    type: [GetAllTodosResponseDto],
  })
  findAll(): Promise<GetAllTodosResponse[]> {
    return this.todosService.getAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Todo found',
    type: GetTodoByIdResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Todo not found' })
  findOne(@Param('id') id: string): Promise<GetTodoByIdResponse> {
    return this.todosService.getById(id);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'Todo successfully updated',
    type: UpdateTodoResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Todo not found' })
  update(
    @Param() params: UpdateTodoRequestParams,
    @Body() body: UpdateTodoRequestBody,
  ): Promise<UpdateTodoResponse> {
    return this.todosService.update(params.id, body);
  }

  @Delete(':id')
  @ApiNoContentResponse({
    description: 'Todo successfully deleted',
  })
  @ApiNotFoundResponse({ description: 'Todo not found' })
  delete(@Param() params: DeleteTodoRequestParams): void {
     this.todosService.delete(params.id);
  }
}
