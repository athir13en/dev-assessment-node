import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeORMDBModule } from './database/typeormdb.module';
import { TeacherModule } from './teacher/teacher.module';

@Module({
  imports: [TypeORMDBModule, TeacherModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
