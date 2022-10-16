import { IsEmail, IsNotEmpty } from 'class-validator';

export class createTeacherDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
