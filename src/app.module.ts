import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppRepository } from './app.repository';
import { AppService } from './app.service';
import { TypeOrmExModule } from './database/lib/typeorm-ex.module';
import { TypeORMDBModule } from './database/typeormdb.module';

@Module({
  imports: [
    TypeORMDBModule,
    TypeOrmExModule.forCustomRepository([AppRepository]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
