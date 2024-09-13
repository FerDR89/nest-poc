import { Injectable } from '@nestjs/common';
import { readFileSync, writeFileSync } from 'node:fs';
import * as path from 'node:path';
import { Todo } from './interfaces/todo.interface';

@Injectable()
export class TodoService {
  todos: Todo[] = [];

  private load(): void {
    try {
      const data = readFileSync(
        path.join(`${__dirname}/../../src/db/todos.json`),
        {
          encoding: 'utf8',
        },
      );
      this.todos = JSON.parse(data);
    } catch (error) {
      console.log(error);
    }
  }

  private save(todo): void {
    const stingifiedTodo = JSON.stringify(todo);
    try {
      writeFileSync(
        path.join(`${__dirname}/../../src/db/todos.json`),
        stingifiedTodo,
      );
    } catch (error) {
      console.log(error);
    }
  }

  getAll(): Todo[] {
    this.load();
    return this.todos;
  }

  getOneByID(id: number): Todo {
    this.load();
    return this.todos.find((t) => t.id === id);
  }

  createTodo(todo: Pick<Todo, 'description' | 'done' | 'title'>): Todo[] {
    this.load();
    const newTodo = {
      ...todo,
      id: this.todos[this.todos.length - 1].id + 1,
    };
    this.todos.push(newTodo);
    this.save(this.todos);
    return this.todos;
  }

  updateTodo(todo: Todo): Todo[] {
    this.load();

    const foundTodo = this.todos?.find((t) => t.id === todo.id);

    if (!foundTodo) {
      throw new Error('todo not found');
    }

    const foundTodoIndex: number = this.todos.findIndex(
      (t) => t.id === foundTodo.id,
    );

    this.todos[foundTodoIndex] = {
      ...this.todos[foundTodoIndex],
      ...todo,
    };

    this.save(this.todos);
    return this.todos;
  }

  deleteOneById(id: number) {
    this.load();
    const removedTodo = this.todos.find((t) => t.id === id);

    if (!removedTodo) {
      throw new Error('todo not found');
    }

    const filteredTodoArray = this.todos.filter((t) => t.id !== removedTodo.id);
    this.todos = filteredTodoArray;
    this.save(this.todos);
    return removedTodo;
  }
}
