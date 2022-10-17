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
import { CustomMessages } from './app.constant';
import { AppService } from './app.service';
import {
  RegisterStudents,
  RetrieveNotification,
  SuspendStudent,
} from './dtos/teacher.dto';
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
    try {
      const _result = await this.teacherService.registerStudents(
        registerStudents,
      );
      if (_result === CustomMessages.success) {
        return response.status(HttpStatus.NO_CONTENT).json();
      } else {
        return response
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: _result });
      }
    } catch (err) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: CustomMessages.registerStudentsError });
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
      return response.status(HttpStatus.OK).json({ students: _result });
    } catch (err) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: CustomMessages.commontStudentsError });
    }
  }

  @Post('suspend')
  public async suspend(
    @Body() suspendStudent: SuspendStudent,
    @Res() response: Response,
  ) {
    try {
      const _result = await this.studentService.suspendStudent(suspendStudent);
      if (_result === CustomMessages.success) {
        return response.status(HttpStatus.NO_CONTENT).json();
      } else {
        return response
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: _result });
      }
    } catch (err) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: CustomMessages.suspendStudentError });
    }
  }

  @Post('retrievefornotifications')
  public async retrievefornotifications(
    @Body() retrieveNotification: RetrieveNotification,
    @Res() response: Response,
  ) {
    try {
      let _allStudents = [];
      // get teacher's student
      const _teacher = await this.teacherService.getTeacherStudents(
        retrieveNotification.teacher,
      );
      if (!_teacher) {
        return response
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: CustomMessages.teacherNotFound });
      }
      _allStudents = [..._allStudents, ..._teacher.students];
      // add student if @ exist
      if (retrieveNotification.notification.indexOf('@') > 0) {
        const _AStudentList = retrieveNotification.notification.split(' @');
        _AStudentList.shift();
        const _rAStudentList = await this.studentService.getStudentsByEmail(
          _AStudentList,
        );
        _allStudents = [..._allStudents, ..._rAStudentList];
      }
      const _finalResult = _allStudents
        .filter((x) => x.status)
        .map((x) => x.email);
      return response.status(HttpStatus.OK).json({ recipients: _finalResult });
    } catch (err) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: CustomMessages.retrievefornotificationsError });
    }
  }
}
