import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const getAllTodosResponseSchema = z.object({
  id: z.uuid(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  deleted: z.boolean(),
  description: z.string(),
  completed: z.boolean(),
});

export type GetAllTodosResponse = z.infer<typeof getAllTodosResponseSchema>;

export class GetAllTodosResponseDto extends createZodDto(
  getAllTodosResponseSchema,
) {}
