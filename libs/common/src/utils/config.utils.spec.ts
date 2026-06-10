import { z } from 'zod';

import { validateConfig } from './config.utils';

const mockConfigSchema = z.object({
  FOO: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().finite()),
  BAR: z
    .enum(['true', 'false'])
    .optional()
    .transform((val) => (val ? val === 'true' : false))
    .pipe(z.boolean()),
});

describe('validateConfig', () => {
  const originalEnv = process.env;

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should validate and transform configuration from environment variables', () => {
    process.env = { ...process.env, FOO: '42' };

    const config = validateConfig(mockConfigSchema);

    expect(config).toEqual({
      FOO: 42,
      BAR: false,
    });
  });

  it('should apply transformations correctly', () => {
    process.env = { ...process.env, FOO: '100', BAR: 'false' };

    const config = validateConfig(mockConfigSchema);

    expect(config.FOO).toBe(100);
    expect(config.BAR).toBe(false);
  });

  it('should handle optional fields correctly when present', () => {
    process.env = { ...process.env, FOO: '55', BAR: 'true' };

    const config = validateConfig(mockConfigSchema);

    expect(config.FOO).toBe(55);
    expect(config.BAR).toBe(true);
  });

  it('should throw error with detailed message when validation fails', () => {
    process.env = { ...process.env, FOO: 'not-a-number' };

    expect(() => validateConfig(mockConfigSchema)).toThrow(
      /Configuration validation failed/,
    );
  });

  it('should throw error when required field is missing', () => {
    process.env = { ...process.env };
    delete process.env.FOO;

    expect(() => validateConfig(mockConfigSchema)).toThrow(
      /Configuration validation failed/,
    );
  });

  it('should include field path in error message', () => {
    process.env = { ...process.env, FOO: 'invalid' };

    try {
      validateConfig(mockConfigSchema);
      fail('Should have thrown an error');
    } catch (error) {
      expect((error as Error).message).toContain('FOO');
    }
  });
});
