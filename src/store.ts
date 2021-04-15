import { makeAutoObservable } from "mobx";
import Todo from "./interfaces/Todo";

class Store {
  todos: Todo[] = [];
  newTodo = "";
  date: Date = new Date();
  id: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  addTodo() {
    this.todos = [
      ...this.todos,
      {
        id: Math.max(0, Math.max(...this.todos.map(({ id }) => id))) + 1,
        task: this.newTodo,
        date: this.date,
      },
    ];
    this.newTodo = "";
    this.date = new Date();
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }

  editTodo(id: number) {
    this.todos = this.todos.map((todo: Todo) => {
      if (id === todo.id) {
        return {
          ...todo,
          task: this.newTodo,
          date: this.date,
        };
      }
      return todo
    });
    this.newTodo = "";
    this.date = new Date();
    this.id = 0
  }
}

const store = new Store();
export default store;
