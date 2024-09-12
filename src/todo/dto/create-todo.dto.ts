import { IsString, IsBoolean, IsEmpty, MinLength } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsEmpty()
  @MinLength(2)
  title: string;

  @IsString()
  @IsEmpty()
  @MinLength(2)
  description: string;

  @IsBoolean()
  @IsEmpty()
  done: boolean;
}
