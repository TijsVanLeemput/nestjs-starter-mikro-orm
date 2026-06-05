import { existsSync, readdirSync } from 'fs';
import { join } from 'path';

type EntityPaths = {
  /** Compiled .js entity files for runtime */
  entities: string[];
  /** Source .ts entity files for metadata discovery via TsMorphMetadataProvider */
  entitiesTs: string[];
};

/**
 * Recursively find all files matching a pattern in a directory
 * @param dir - Directory to search
 * @param pattern - File pattern to match (e.g., '.entity.ts')
 * @param baseDir - Base directory for relative path calculation
 * @returns Array of relative paths matching the pattern
 */
function findFilesRecursive(
  dir: string,
  pattern: string,
  baseDir: string,
): string[] {
  const files: string[] = [];

  if (!existsSync(dir)) {
    return files;
  }

  try {
    const entries = readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = join(dir, entry.name);

      if (entry.isDirectory()) {
        // Recursively search subdirectories
        files.push(...findFilesRecursive(fullPath, pattern, baseDir));
      } else if (entry.name.endsWith(pattern)) {
        // Calculate relative path from baseDir
        const relativePath = fullPath
          .substring(baseDir.length + 1)
          .replace(/\\/g, '/');
        files.push(relativePath);
      }
    }
  } catch (error) {
    console.warn(`[MikroORM] Failed to read directory ${dir}:`, error);
  }

  return files;
}

/**
 * Discover entity paths for MikroORM configuration.
 *
 * Returns:
 * - `entities`: Glob pattern for compiled .js files (for runtime loading)
 * - `entitiesTs`: Glob pattern for TypeScript source (for TsMorphMetadataProvider metadata discovery)
 *
 * This allows MikroORM to:
 * 1. Load compiled entities at runtime (no module linking issues)
 * 2. Discover metadata from TypeScript source via TsMorphMetadataProvider
 * 3. Avoid executing decorators without proper context
 *
 * @returns Object containing glob patterns for both compiled and source entities
 * @throws Error if no source entities are found
 */
export function getEntityPaths(): EntityPaths {
  const baseDir = process.cwd();

  // Validate that source entities exist
  const sourceEntitiesDir = join(baseDir, 'mikro-orm/entities');
  const foundSourceFiles = findFilesRecursive(
    sourceEntitiesDir,
    '.entity.ts',
    baseDir,
  );

  if (foundSourceFiles.length === 0) {
    throw new Error('No entities found in mikro-orm/entities/**/*.entity.ts');
  }

  // Return glob patterns for both compiled and source entities
  const entities = ['dist/mikro-orm/entities/**/*.entity.js'];
  const entitiesTs = ['mikro-orm/entities/**/*.entity.ts'];

  return {
    entities,
    entitiesTs,
  };
}
