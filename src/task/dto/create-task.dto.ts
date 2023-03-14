import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Status as prismaStatus } from '@prisma/client';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsEmail()
  title: string;
  @MinLength(10)
  @IsNotEmpty()
  description: string;
  dueDate: string;
  status: prismaStatus;
}
