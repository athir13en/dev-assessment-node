import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeORMDBModule } from './database/typeormdb.module';

@Module({
  imports: [TypeORMDBModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
