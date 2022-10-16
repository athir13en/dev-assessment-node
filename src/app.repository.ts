import { Repository } from 'typeorm';
import { CustomRepository } from './database/lib/typeorm-ex.decorator';
import { RegisterStudents } from './dtos/teacher.dto';
import { Student } from './entities/student.entity';
import { Teacher } from './entities/teacher.entity';

@CustomRepository(Teacher)
export class AppRepository extends Repository<Teacher> {
  /**
   * register students
   */
  async registerStudents(
    foundTeacher: Teacher,
    registerStudents: RegisterStudents,
  ): Promise<Teacher> {
    const newStudents = [];
    registerStudents.students.map((student) => {
      const newStudent = new Student();
      newStudent.email = student;
      newStudent.status = true;
      newStudents.push(newStudent);
    });
    foundTeacher.students = newStudents;
    await foundTeacher.save();
    return foundTeacher;
  }
}
