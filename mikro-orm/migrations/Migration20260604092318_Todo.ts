import { Migration } from '@mikro-orm/migrations';

export class Migration20260604092318_Todo extends Migration {

  override up(): void | Promise<void> {
    this.addSql(`create table "todos" ("id" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "deleted" boolean not null default false, "description" varchar(255) not null, "completed" boolean not null, primary key ("id"));`);
  }

  override down(): void | Promise<void> {
    this.addSql(`drop table if exists "todos" cascade;`);
  }

}
