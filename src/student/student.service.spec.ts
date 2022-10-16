import { Test, TestingModule } from '@nestjs/testing';
import { StudentRepository } from './student.repository';
import { StudentService } from './student.service';

describe('StudentService', () => {
  let service: StudentService;

  const mockStudentRepository = {};

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
});
