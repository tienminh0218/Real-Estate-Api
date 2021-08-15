import 'dotenv/config';
import { GqlModuleOptions } from '@nestjs/graphql';
import { JwtModuleOptions } from '@nestjs/jwt';
import { Logger } from '@nestjs/common';

class ConfigService {
  constructor(private env: { [key: string]: string | undefined }) {}

  getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      Logger.error(`Config Error - missing env.${key}`);
      throw new Error(`Config Error - missing env.${key}`);
    }

    return value;
  }

  ensureValues(keys: string[]) {
    keys.forEach((key) => this.getValue(key));
    return this;
  }

  getJwtConfig(): JwtModuleOptions {
    return {
      secret: this.getValue('JWT_SECRET'),
      signOptions: {
        expiresIn: `${this.getValue('JWT_EXPIRATION_TIME')}s` || '60s',
      },
    };
  }

  getGraphQLConfig(): GqlModuleOptions {
    return {
      autoSchemaFile: true,
      context: ({ req, res }) => ({ req, res }),
    };
  }
}

export const configService = new ConfigService(process.env).ensureValues([
  'JWT_SECRET',
  'JWT_EXPIRATION_TIME',
]);
