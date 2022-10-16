import { Test, TestingModule } from '@nestjs/testing';
import { SuspendStudent } from '../dtos/teacher.dto';
import { StudentRepository } from './student.repository';
import { StudentService } from './student.service';

describe('StudentService', () => {
  let service: StudentService;

  const _returnStudentArray = [
    { id: 1, email: 'student1@mail.com', status: true, teachers: [] },
    { id: 2, email: 'student2@mail.com', status: true, teachers: [] },
  ];

  const mockStudentRepository = {
    suspendStudent: jest.fn(),
    findOne: jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve({ id: 1, email: 'student1@mail.com', status: true }),
      ),
    getAllStudentWithoutTeacher: jest.fn(),
    find: jest
      .fn()
      .mockImplementation(() => Promise.resolve(_returnStudentArray)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentService,
        {
          provide: StudentRepository,
          useValue: mockStudentRepository,
        },
      ],
    }).compile();

    service = module.get<StudentService>(StudentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should give expected return as "1"', async () => {
    mockStudentRepository.suspendStudent = jest.fn().mockReturnValue('1');
    const _suspendStudent = new SuspendStudent();
    _suspendStudent.student = 'student1@mail.com';
    const suspendStudent = await service.suspendStudent(_suspendStudent);
    expect(suspendStudent).toEqual('1');
  });

  it('should give expected return as list of students', async () => {
    const studentsWithoutTeacher = await service.getAllStudentWithoutTeacher();
    expect(studentsWithoutTeacher).toHaveLength(2);
  });
});
