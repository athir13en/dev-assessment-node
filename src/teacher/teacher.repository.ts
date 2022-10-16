import { CustomRepository } from 'src/database/lib/typeorm-ex.decorator';
import { RegisterStudents } from 'src/dtos/teacher.dto';
import { Student } from 'src/entities/student.entity';
import { Teacher } from 'src/entities/teacher.entity';
import { Repository } from 'typeorm';

@CustomRepository(Teacher)
export class TeacherRepository extends Repository<Teacher> {
  /**
   * register students
   */
  public async registerStudents(
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
