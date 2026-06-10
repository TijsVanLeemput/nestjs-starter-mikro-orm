import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const deleteTodoRequestParamsSchema = z.object({
  id: z.uuid('Invalid todo ID format'),
});
export type DeleteTodoRequestParams = z.infer<
  typeof deleteTodoRequestParamsSchema
>;
export class DeleteTodoRequestParamsDto extends createZodDto(
  deleteTodoRequestParamsSchema,
) {}

export const deleteTodoResponseSchema = z.object({
  id: z.uuid(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  deleted: z.boolean(),
  description: z.string(),
  completed: z.boolean(),
});

export type DeleteTodoResponse = z.infer<typeof deleteTodoResponseSchema>;

export class DeleteTodoResponseDto extends createZodDto(
  deleteTodoResponseSchema,
) {}
