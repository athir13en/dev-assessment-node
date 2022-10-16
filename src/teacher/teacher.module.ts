import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { TypeOrmExModule } from 'src/database/lib/typeorm-ex.module';
import { TeacherRepository } from './teacher.repository';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([TeacherRepository])],
  providers: [TeacherService],
  controllers: [TeacherController],
})
export class TeacherModule {}
