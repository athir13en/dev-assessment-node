import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppRepository } from './app.repository';
import { RegisterStudents } from './dtos/teacher.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(AppRepository)
    private appRepo: AppRepository,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async registerStudents(registerStudents: RegisterStudents): Promise<boolean> {
    const foundTeacher = await this.appRepo.findOne({
      where: { email: registerStudents.teacher },
    });
    if (foundTeacher) {
      this.appRepo.registerStudents(foundTeacher, registerStudents);
    } else {
      return false;
    }
    return true;
  }
}
