import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';
import { CustomMessages } from './app.constant';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  RegisterStudents,
  RetrieveNotification,
  SuspendStudent,
} from './dtos/teacher.dto';
import { StudentService } from './student/student.service';
import { TeacherService } from './teacher/teacher.service';

describe('AppController', () => {
  let appController: AppController;

  const mockTeacherService = {
    registerStudents: jest.fn(),
    getTeacherStudents: jest.fn(),
  };
  const mockStudentService = {
    suspendStudent: jest.fn(),
    getStudentsByEmail: jest.fn(),
    getAllStudentWithoutTeacher: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: TeacherService,
          useValue: mockTeacherService,
        },
        {
          provide: StudentService,
          useValue: mockStudentService,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  const mockResponse = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockImplementation().mockReturnValue({
      status: HttpStatus.NO_CONTENT,
    });
    return res;
  };

  const mockResponseError = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockImplementation().mockReturnValue({
      status: HttpStatus.BAD_REQUEST,
      message: CustomMessages.studentNotFound,
    });
    return res;
  };

  describe('register', () => {
    it('should be able to accept RegisterStudents object and return 204', async () => {
      mockTeacherService.registerStudents = jest
        .fn()
        .mockReturnValue(CustomMessages.success);
      const _registerStudent = new RegisterStudents();
      _registerStudent.teacher = 'teacher1@email.com';
      _registerStudent.students = ['student1@mail.com', 'student2@mail.com'];
      const regStudent = await appController.registerStudents(
        _registerStudent,
        mockResponse(),
      );
      expect(regStudent.status).toEqual(HttpStatus.NO_CONTENT);
    });
  });

  describe('commonstudents', () => {
    it('should be able to accept parameters and return object with property - status', async () => {
      const commonsStudent = await appController.commontStudents(
        { teacher: ['teacher1@email.com', 'teacher2@email.com'] },
        mockResponse(),
      );
      expect(commonsStudent).toHaveProperty('status');
    });
  });

  describe('suspend', () => {
    it('should be able to accept SuspendStudent object and return object with property - status', async () => {
      mockStudentService.suspendStudent = jest
        .fn()
        .mockReturnValue(CustomMessages.success);
      const _suspentStudent = new SuspendStudent();
      _suspentStudent.student = 'student1@mail.com';
      const suspStudent = await appController.suspend(
        _suspentStudent,
        mockResponse(),
      );
      expect(suspStudent).toHaveProperty('status');
    });

    it('should be able to return status code 400 with error message', async () => {
      mockStudentService.suspendStudent = jest
        .fn()
        .mockReturnValue(CustomMessages.studentNotFound);
      const _suspentStudent = new SuspendStudent();
      _suspentStudent.student = 'studentNotExistance@mail.com';
      const suspStudent = await appController.suspend(
        _suspentStudent,
        mockResponseError(),
      );
      expect(suspStudent.status).toEqual(HttpStatus.BAD_REQUEST);
      expect(suspStudent).toEqual({
        status: HttpStatus.BAD_REQUEST,
        message: CustomMessages.studentNotFound,
      });
    });
  });

  describe('retrievefornotifications', () => {
    it('should be able to accept RetrieveNotification object and return', async () => {
      mockTeacherService.getTeacherStudents = jest
        .fn()
        .mockReturnValue({ id: 1, email: 'teacher1@email.com', students: [] });
      const _retrieveNotification = new RetrieveNotification();
      _retrieveNotification.teacher = 'teacher1@gmail.com';
      _retrieveNotification.notification =
        'Hello students! @studentagnes@gmail.com @studentmiche@gmail.com';
      const notification = await appController.retrievefornotifications(
        _retrieveNotification,
        mockResponse(),
      );
      expect(notification).toHaveProperty('status');
    });
  });
});
