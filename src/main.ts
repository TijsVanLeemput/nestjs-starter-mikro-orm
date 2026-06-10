import { Environment } from '@libs/common';
import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import { ZodValidationPipe } from 'nestjs-zod';
import * as winston from 'winston';

import { AppConfig, appConfig } from './app.config';
import { AppModule } from './app.module';

const APP_NAME = 'nestjs-starter';

async function bootstrap() {
  const logger = winston.createLogger({
    level: process.env.LOG_LEVEL,
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.ms(),
          nestWinstonModuleUtilities.format.nestLike(APP_NAME.toLowerCase(), {
            colors: true,
            prettyPrint: true,
          }),
        ),
      }),
    ],
  });

  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance: logger,
    }),
  });

  const _appConfig: AppConfig = await app.get(appConfig.KEY);

  // API versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Request validation
  app.useGlobalPipes(new ZodValidationPipe());

  // Security
  app.use(helmet({ contentSecurityPolicy: false }));
  app.enableCors({
    origin: _appConfig.allowedOrigins || '*',
  });

  // Swagger
  if (_appConfig.environment !== Environment.Production) {
    const config = new DocumentBuilder().setTitle(APP_NAME).build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/', app, document);
  }

  await app.listen(_appConfig.port);

  logger.info(`Server running on port ${_appConfig.port}`);
}

void bootstrap();
