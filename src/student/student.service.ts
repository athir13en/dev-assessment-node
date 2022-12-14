import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomMessages } from '../app.constant';
import { SuspendStudent } from '../dtos/teacher.dto';
import { In } from 'typeorm';
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
  public async getAllStudentWithoutTeacher() {
    const _result = await this.studentRepo.find({
      relations: ['teachers'],
    });
    return _result.filter((student) => student.teachers.length == 0);
  }

  /**
   * suspend student
   */
  public async suspendStudent(suspendStudent: SuspendStudent): Promise<string> {
    const _foundStudent = await this.studentRepo.findOne({
      where: { email: suspendStudent.student },
    });
    if (_foundStudent) {
      // suspend student
      if (_foundStudent.status) {
        this.studentRepo.suspendStudent(_foundStudent);
      } else {
        return CustomMessages.studentAlreadySuspended;
      }
      return CustomMessages.success;
    } else {
      return CustomMessages.studentNotFound;
    }
  }

  /**
   * get students by email
   */
  public async getStudentsByEmail(_emails: string[]) {
    return await this.studentRepo.findBy({
      email: In(_emails),
    });
  }
}
