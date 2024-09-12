import { Injectable } from '@nestjs/common';
import { readFileSync, writeFileSync } from 'node:fs';
import * as path from 'node:path';

export interface Todo {
  id: number;
  title: string;
  description: string;
  done: boolean;
}

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
    return this.todos.find((t) => t.id === id);
  }

  createTodo(todo: Pick<Todo, 'description' | 'done' | 'title'>): Todo[] {
    const newTodo = {
      ...todo,
      id: this.todos.length + 1,
    };

    this.todos.push(newTodo);
    this.save(this.todos);
    return this.todos;
  }
}
