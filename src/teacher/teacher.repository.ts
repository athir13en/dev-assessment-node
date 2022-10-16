import { CustomRepository } from 'src/database/lib/typeorm-ex.decorator';
import { Teacher } from 'src/entities/teacher.entity';
import { Repository } from 'typeorm';

@CustomRepository(Teacher)
export class TeacherRepository extends Repository<Teacher> {
  /**
   * createTeacher
   */
  public async createTeacher(email: string): Promise<Teacher> {
    const newTeacher = new Teacher();
    newTeacher.email = email;
    await newTeacher.save();
    return newTeacher;
  }
}
