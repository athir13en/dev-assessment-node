import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomMessages } from 'src/app.constant';
import { RegisterStudents } from 'src/dtos/teacher.dto';
import { TeacherRepository } from './teacher.repository';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(TeacherRepository)
    private teacherRepo: TeacherRepository,
  ) {}

  public async registerStudents(
    registerStudents: RegisterStudents,
  ): Promise<string> {
    const foundTeacher = await this.teacherRepo.findOne({
      where: { email: registerStudents.teacher },
    });
    if (foundTeacher) {
      this.teacherRepo.registerStudents(foundTeacher, registerStudents);
    } else {
      return CustomMessages.teacherNotFound;
    }
    return CustomMessages.success;
  }

  /**
   * Get teachers student
   */
  public async getTeacherStudents(teacherEmail: string) {
    return await this.teacherRepo.findOne({
      where: { email: teacherEmail },
      relations: ['students'],
    });
  }
}
