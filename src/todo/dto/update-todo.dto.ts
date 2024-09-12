import {
  IsString,
  IsInt,
  IsBoolean,
  Min,
  IsEmpty,
  IsPositive,
  MinLength,
} from 'class-validator';

export class UpdateTodoDto {
  @IsInt()
  @Min(1)
  @IsPositive()
  @IsEmpty()
  id: number;

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
