import { CustomRepository } from '../database/lib/typeorm-ex.decorator';
import { RegisterStudents } from '../dtos/teacher.dto';
import { Student } from '../entities/student.entity';
import { Teacher } from '../entities/teacher.entity';
import { Repository } from 'typeorm';

@CustomRepository(Teacher)
export class TeacherRepository extends Repository<Teacher> {
  /**
   * register students
   */
  public async registerStudents(
    foundTeacher: Teacher,
    registerStudents: RegisterStudents,
  ): Promise<string> {
    try {
      const newStudents = [];
      registerStudents.students.map((student) => {
        const newStudent = new Student();
        newStudent.email = student;
        newStudent.status = true;
        newStudents.push(newStudent);
      });
      foundTeacher.students = newStudents;
      await foundTeacher.save();
      return '1';
    } catch (err) {
      return 'Error register students!';
    }
  }
}
