import { CustomRepository } from 'src/database/lib/typeorm-ex.decorator';
import { Student } from 'src/entities/student.entity';
import { Repository } from 'typeorm';

@CustomRepository(Student)
export class StudentRepository extends Repository<Student> {
  /**
   * suspend student
   */
  public async suspendStudent(student: Student): Promise<string> {
    try {
      student.status = false;
      await student.save();
      return '1';
    } catch (err) {
      console.log('Error suspending student!' + err);
      return 'Error suspending student!';
    }
  }
}
