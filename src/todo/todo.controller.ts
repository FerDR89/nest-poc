import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Todo, TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';

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
  createTodo(@Body() todo: CreateTodoDto) {
    console.log(todo);

    // return this.todoService.createTodo(todo);
  }
}
