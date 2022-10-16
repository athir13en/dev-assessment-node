import { CustomRepository } from 'src/database/lib/typeorm-ex.decorator';
import { Student } from 'src/entities/student.entity';
import { Repository } from 'typeorm';

@CustomRepository(Student)
export class StudentRepository extends Repository<Student> {}
