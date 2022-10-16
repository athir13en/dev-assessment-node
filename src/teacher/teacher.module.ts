import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/database/lib/typeorm-ex.module';
import { TeacherRepository } from './teacher.repository';
import { TeacherService } from './teacher.service';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([TeacherRepository])],
  providers: [TeacherService],
  exports: [TeacherService],
})
export class TeacherModule {}
