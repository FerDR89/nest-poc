import { IsString, IsBoolean, MinLength, IsNotEmpty } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  description: string;

  @IsBoolean()
  @IsNotEmpty()
  done: boolean;
}
