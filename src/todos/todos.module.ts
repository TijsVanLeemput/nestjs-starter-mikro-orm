import { MikroOrmModule } from '@libs/mikro-orm';
import { TodoRepository } from '@libs/mikro-orm/repositories';
import { Module } from '@nestjs/common';

import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';

@Module({
  imports: [MikroOrmModule],
  controllers: [TodosController],
  providers: [TodosService, TodoRepository],
})
export class TodosModule {}
