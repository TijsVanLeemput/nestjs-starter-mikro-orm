import { Environment, LogLevel, validateConfig } from '@libs/common';
import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const environmentValues = Object.values(Environment) as [string, ...string[]];
const logLevelValues = Object.values(LogLevel) as [string, ...string[]];

const appConfigSchema = z.object({
  NODE_ENV: z.enum(environmentValues),
  PORT: z.string().transform(Number).pipe(z.number().int().min(1).max(65535)),
  LOG_LEVEL: z.enum(logLevelValues),
  ALLOWED_ORIGINS: z
    .string()
    .optional()
    .transform((value) => (value ? value.split(',') : [])),
  REQUESTS_PER_MINUTE: z
    .string()
    .optional()
    .transform((value) => (value ? Number(value) : 100))
    .pipe(z.number()),
  VALKEY_URL: z.string(),
}).transform((data) => ({
  environment: data.NODE_ENV,
  port: data.PORT,
  logLevel: data.LOG_LEVEL,
  allowedOrigins: data.ALLOWED_ORIGINS,
  requestsPerMinute: data.REQUESTS_PER_MINUTE,
  valkeyUrl: data.VALKEY_URL,
}));
export type AppConfig = z.infer<typeof appConfigSchema>;

export const appConfig = registerAs('app', () => {
  return validateConfig(appConfigSchema);
});
