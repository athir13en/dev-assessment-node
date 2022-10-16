import { Body, Controller, Get, Post } from '@nestjs/common';
import { response } from 'express';
import { AppService } from './app.service';
import { RegisterStudents } from './dtos/teacher.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('register')
  public async registerStudents(@Body() registerStudents: RegisterStudents) {
    const result = this.appService.registerStudents(registerStudents);
    return result ? response.status(204) : response.status(404);
  }
}
