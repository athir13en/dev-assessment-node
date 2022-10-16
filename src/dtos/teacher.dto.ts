import { ArrayMinSize, IsArray, IsEmail, IsNotEmpty } from 'class-validator';
import { studentDTO } from './student.dto';

export class CreateTeacherDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class RegisterStudents {
  @IsEmail()
  @IsNotEmpty()
  teacher: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  students: string[];
}
