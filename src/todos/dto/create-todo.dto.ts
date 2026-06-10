import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const createTodoRequestBodySchema = z.object({
  description: z.string().min(1, 'Description is required'),
});

export type CreateTodoRequestBody = z.infer<typeof createTodoRequestBodySchema>;

export class CreateTodoRequestBodyDto extends createZodDto(
  createTodoRequestBodySchema,
) {}

export const createTodoResponseSchema = z.object({
  id: z.uuid(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  deleted: z.boolean(),
  description: z.string(),
  completed: z.boolean(),
});

export type CreateTodoResponse = z.infer<typeof createTodoResponseSchema>;

export class CreateTodoResponseDto extends createZodDto(
  createTodoResponseSchema,
) {}
