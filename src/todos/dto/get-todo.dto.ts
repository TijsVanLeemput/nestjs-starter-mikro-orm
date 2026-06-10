import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const getTodoByIdResponseSchema = z.object({
  id: z.uuid(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  deleted: z.boolean(),
  description: z.string(),
  completed: z.boolean(),
});

export type GetTodoByIdResponse = z.infer<typeof getTodoByIdResponseSchema>;

export class GetTodoByIdResponseDto extends createZodDto(
  getTodoByIdResponseSchema,
) {}
