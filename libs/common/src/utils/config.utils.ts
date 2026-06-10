import { z } from 'zod';

/**
 * Validates environment configuration against a Zod schema.
 * Throws a descriptive error if validation fails.
 *
 * @param schema - The Zod schema to validate against
 * @returns The validated and transformed configuration
 * @throws {Error} If validation fails with detailed error messages
 *
 * @example
 * ```typescript
 * const configSchema = z.object({
 *   PORT: z.string().transform(Number).pipe(z.number()),
 *   NODE_ENV: z.enum(['development', 'production']),
 * });
 *
 * const config = validateConfig(configSchema);
 * ```
 */
export function validateConfig<T extends z.ZodType>(schema: T): z.infer<T> {
  const { success, data, error } = schema.safeParse(process.env);

  if (!success) {
    const errorMessages = error.issues
      .map((issue) => {
        const path = issue.path.length > 0 ? issue.path.join('.') : 'root';
        return `  - ${path}: ${issue.message}`;
      })
      .join('\n');

    throw new Error(`Configuration validation failed:\n${errorMessages}`);
  }

  return data;
}
