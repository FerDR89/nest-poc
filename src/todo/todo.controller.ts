import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Patch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './interfaces/todo.interface';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getAll(): Todo[] {
    return this.todoService.getAll();
  }

  @Get(':id')
  getOneByID(@Param('id', ParseIntPipe) id: number): Todo {
    return this.todoService.getOneByID(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createTodo(@Body() todo: CreateTodoDto): Todo[] {
    return this.todoService.createTodo(todo);
  }

  @Patch()
  @UsePipes(new ValidationPipe())
  updateTodo(@Body() todo: UpdateTodoDto): Todo[] {
    try {
      return this.todoService.updateTodo(todo);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error?.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
