import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/database/lib/typeorm-ex.module';
import { StudentRepository } from './student.repository';
import { StudentService } from './student.service';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([StudentRepository])],
  providers: [StudentService],
  exports: [StudentService],
})
export class StudentModule {}
