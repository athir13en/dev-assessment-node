import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createTeacherDTO } from 'src/dtos/teacher.dto';
import { Teacher } from 'src/entities/teacher.entity';
import { TeacherRepository } from './teacher.repository';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(TeacherRepository)
    private teacherRepo: TeacherRepository,
  ) {}

  public async createTeacher(
    createTeacherDTO: createTeacherDTO,
  ): Promise<Teacher> {
    return await this.teacherRepo.createTeacher(createTeacherDTO.email);
  }
}
