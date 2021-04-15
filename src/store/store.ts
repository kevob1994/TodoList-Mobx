import Todo from "../interfaces/Todo";

export function createStore() {
  return {
    todos: [] as Todo[],
    newTodo: "" as string,
    date: new Date() as Date,
    id: 0 as number,
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
    },

    deleteTodo(id: number) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
    },

    editTodo(id: number) {
      this.todos = this.todos.map((todo: Todo) => {
        if (id === todo.id) {
          return {
            ...todo,
            task: this.newTodo,
            date: this.date,
          };
        }
        return todo;
      });
      this.newTodo = "";
      this.date = new Date();
      this.id = 0;
    },
  };
}
export type TStore = ReturnType<typeof createStore>;
