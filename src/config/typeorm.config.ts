import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { join } from 'path';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'mysql',
      host: process.env.DATABASE_HOST || 'localhost',
      port: +process.env.DATABASE_PORT || 3306,
      username: process.env.DATABASE_USER || 'user',
      password: process.env.DATABASE_PASS || 'pass',
      database: process.env.DATABASE_SCHEMA || 'mydb',
      // self sign cert ssl setting
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
      entities: [join(__dirname, '../**', '*.entity.{ts,js}')],
      //entities: ['dist/model/entity/*.entity.{ts,js}'],
      synchronize: true,
    };
  },
};
