import config from '../../../mikro-orm.config';
import { MikroOrmModule as BaseMikroOrmModule } from '@mikro-orm/nestjs';
import { Global, Module } from '@nestjs/common';

import { MikroOrmService } from './mikro-orm.service';

@Global()
@Module({
  imports: [
    BaseMikroOrmModule.forRootAsync({
      useFactory: () => config,
    }),
  ],
  providers: [MikroOrmService],
  exports: [MikroOrmService],
})
export class MikroOrmModule {}
