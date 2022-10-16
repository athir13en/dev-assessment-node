import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { response } from 'express';
import { AppService } from './app.service';
import { RegisterStudents } from './dtos/teacher.dto';
import { StudentService } from './student/student.service';
import { TeacherService } from './teacher/teacher.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private teacherService: TeacherService,
    private studentService: StudentService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('register')
  public async registerStudents(@Body() registerStudents: RegisterStudents) {
    const result = this.teacherService.registerStudents(registerStudents);
    return result ? response.status(204) : response.status(404);
  }

  @Get('commonstudents')
  public async commontStudents(@Query() query: { teacher: string[] }) {
    let resultTe = [];
    for (const _teacher of query.teacher) {
      const _resultTe = await this.teacherService.getTeacherStudents(_teacher);
      if (_resultTe) resultTe = [...resultTe, ..._resultTe.students];
    }
    const resultSt = await this.studentService.getAllStudentWithoutTeacher();

    const result = [
      ...resultSt.map((x) => x.email),
      ...resultTe.map((x) => x.email),
    ];
    return { students: result };
  }
}
