import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { RegisterStudents, SuspendStudent } from './dtos/teacher.dto';
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
  public async registerStudents(
    @Body() registerStudents: RegisterStudents,
    @Res() response: Response,
  ) {
    const _result = await this.teacherService.registerStudents(
      registerStudents,
    );
    if (_result === '1') {
      return response.status(HttpStatus.NO_CONTENT).send();
    } else {
      return response.status(HttpStatus.BAD_REQUEST).send({ message: _result });
    }
  }

  @Get('commonstudents')
  public async commontStudents(
    @Query() query: { teacher: string[] },
    @Res() response: Response,
  ) {
    try {
      let _resultTes = [];
      for (const _teacher of query.teacher) {
        const _resultTe = await this.teacherService.getTeacherStudents(
          _teacher,
        );
        if (_resultTe) _resultTes = [..._resultTes, ..._resultTe.students];
      }
      const _resultSt = await this.studentService.getAllStudentWithoutTeacher();

      const _result = [
        ..._resultSt.map((x) => x.email),
        ..._resultTes.map((x) => x.email),
      ];
      return response.status(HttpStatus.OK).send({ students: _result });
    } catch (err) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send({ message: 'Error getting common students' });
    }
  }

  @Post('suspend')
  public async suspend(
    @Body() suspendStudent: SuspendStudent,
    @Res() response: Response,
  ) {
    const _result = await this.studentService.suspendStudent(suspendStudent);
    if (_result === '1') {
      return response.status(HttpStatus.NO_CONTENT).send();
    } else {
      return response.status(HttpStatus.BAD_REQUEST).send({ message: _result });
    }
  }
}
