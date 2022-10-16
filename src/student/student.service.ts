import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentRepository } from './student.repository';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentRepository)
    private studentRepo: StudentRepository,
  ) {}

  /**
   * Get all students
   */
  async getAllStudentWithoutTeacher() {
    const _result = await this.studentRepo.find({
      relations: ['teachers'],
    });
    return _result.filter((student) => student.teachers.length == 0);
  }
}
