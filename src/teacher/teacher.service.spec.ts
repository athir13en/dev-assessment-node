import { Test, TestingModule } from '@nestjs/testing';
import { TeacherRepository } from './teacher.repository';
import { TeacherService } from './teacher.service';

describe('TeacherService', () => {
  let service: TeacherService;

  const mockTeacherRepository = {};

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
});
