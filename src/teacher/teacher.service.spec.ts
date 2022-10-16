import { Test, TestingModule } from '@nestjs/testing';
import { TeacherRepository } from './teacher.repository';
import { TeacherService } from './teacher.service';

describe('TeacherService', () => {
  let service: TeacherService;

  const mockTeacherRepository = {
    getTeacherStudents: jest.fn(),
    findOne: jest.fn().mockImplementation(() =>
      Promise.resolve({
        id: 1,
        email: 'teacher1@email.com',
        students: [],
      }),
    ),
    registerStudents: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeacherService,
        {
          provide: TeacherRepository,
          useValue: mockTeacherRepository,
        },
      ],
    }).compile();

    service = module.get<TeacherService>(TeacherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should give expected return as a teacher object', async () => {
    const _teacher = await service.getTeacherStudents('teacher1@email.com');
    expect(_teacher).toEqual({
      id: 1,
      email: 'teacher1@email.com',
      students: [],
    });
  });

  it('should give expected return as "1"', async () => {
    mockTeacherRepository.registerStudents = jest.fn().mockReturnValue({
      id: 1,
      email: 'teacher1@email.com',
      students: ['studentjon@gmail.com', 'studenthon@gmail.com'],
    });
    const _registerStudent = {
      teacher: 'teacher1@email.com',
      students: ['student1@mail.com', 'student2@mail.com'],
    };
    const _register = await service.registerStudents(_registerStudent);
    expect(_register).toEqual('1');
  });
});
