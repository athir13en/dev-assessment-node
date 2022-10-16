import { Body, Controller, Post } from '@nestjs/common';
import { createTeacherDTO } from 'src/dtos/teacher.dto';
import { Teacher } from 'src/entities/teacher.entity';
import { TeacherService } from './teacher.service';

@Controller('teacher')
export class TeacherController {
  constructor(private teacherSearvice: TeacherService) {}

  @Post('create')
  public async createTeacher(
    @Body() createTeacherDto: createTeacherDTO,
  ): Promise<Teacher> {
    return this.teacherSearvice.createTeacher(createTeacherDto);
  }
}
