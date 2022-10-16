import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterStudents } from 'src/dtos/teacher.dto';
import { Teacher } from 'src/entities/teacher.entity';
import { TeacherRepository } from './teacher.repository';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(TeacherRepository)
    private teacherRepo: TeacherRepository,
  ) {}

  async registerStudents(registerStudents: RegisterStudents): Promise<boolean> {
    const foundTeacher = await this.teacherRepo.findOne({
      where: { email: registerStudents.teacher },
    });
    if (foundTeacher) {
      this.teacherRepo.registerStudents(foundTeacher, registerStudents);
    } else {
      return false;
    }
    return true;
  }

  /**
   * Get teachers student
   */
  async getTeacherStudents(teacherEmail: string) {
    return await this.teacherRepo.findOne({
      where: { email: teacherEmail },
      relations: ['students'],
    });
  }
}
