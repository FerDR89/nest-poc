import {
  IsString,
  IsInt,
  IsBoolean,
  Min,
  IsPositive,
  MinLength,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class UpdateTodoDto {
  @IsInt()
  @Min(1)
  @IsPositive()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsOptional()
  @MinLength(2)
  title: string;

  @IsString()
  @IsOptional()
  @MinLength(2)
  description: string;

  @IsBoolean()
  @IsOptional()
  done: boolean;
}
