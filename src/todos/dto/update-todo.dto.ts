import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const updateTodoRequestParamsSchema = z.object({
  id: z.uuid('Invalid todo ID format'),
});
export type UpdateTodoRequestParams = z.infer<
  typeof updateTodoRequestParamsSchema
>;
export class UpdateTodoRequestParamsDto extends createZodDto(
  updateTodoRequestParamsSchema,
) {}

export const updateTodoRequestBodySchema = z.object({
  description: z.string().min(1).optional(),
  completed: z.boolean().optional(),
});
export type UpdateTodoRequestBody = z.infer<typeof updateTodoRequestBodySchema>;
export class UpdateTodoRequestBodyDto extends createZodDto(
  updateTodoRequestBodySchema,
) {}

export const updateTodoResponseSchema = z.object({
  id: z.uuid(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  deleted: z.boolean(),
  description: z.string(),
  completed: z.boolean(),
});
export type UpdateTodoResponse = z.infer<typeof updateTodoResponseSchema>;
export class UpdateTodoResponseDto extends createZodDto(
  updateTodoResponseSchema,
) {}
