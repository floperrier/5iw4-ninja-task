import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;
  @MinLength(10)
  @IsNotEmpty()
  description: string;
  dueDate: string;
  status: string;
}
