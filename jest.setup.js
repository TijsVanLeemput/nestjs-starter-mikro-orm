// Create a mock EntityManager that will be used for all tests
const mockEntityManager = {
  fork: jest.fn().mockReturnThis(),
  em: {},
};

// Mock @mikro-orm/core to avoid ESM-only code in tests
jest.mock('@mikro-orm/core', () => ({
  EntityManager: jest.fn(() => mockEntityManager),
  Entity: () => (target) => target,
  PrimaryKey: () => (target, propertyName) => {},
  Property: () => (target, propertyName) => {},
  MikroORM: jest.fn(),
  defineConfig: (config) => config,
}));

// Mock @mikro-orm/nestjs to avoid initialization issues
jest.mock('@mikro-orm/nestjs', () => ({
  MikroOrmModule: {
    forRoot: jest.fn(() => ({
      module: 'MikroOrmModule',
      providers: [],
      exports: [],
    })),
  },
}));
