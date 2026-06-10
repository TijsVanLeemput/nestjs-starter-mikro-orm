import { Entity, PrimaryKey, Property } from '@mikro-orm/decorators/legacy';

@Entity({ tableName: 'todos' })
export class Todo {
  @PrimaryKey({ type: 'string' })
  id: string;

  @Property({ type: 'Date', onCreate: () => new Date() })
  createdAt: Date = new Date();

  @Property({
    type: 'Date',
    onCreate: () => new Date(),
    onUpdate: () => new Date(),
  })
  updatedAt: Date = new Date();

  @Property({ type: 'boolean', default: false })
  deleted: boolean = false;

  @Property({ type: 'string' })
  description: string;

  @Property({ type: 'boolean' })
  completed: boolean;
}
