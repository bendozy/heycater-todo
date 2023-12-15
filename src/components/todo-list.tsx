'use client';
import { Todo } from "@/types/todo";
import TodoItem from "./todo-item";
import { deleteTodo, updateTodo } from "@/utils/todo-actions";

const TodoList = ({
  todos,
}: {
  todos: Todo[];
}) => {
  const handleUpdate = async (todo: Todo) => {
    console.log({ todo });
    await updateTodo({
      ...todo,
      completed: !todo.completed
    });
  };

  const handleDelete = async (id: number) => {
    await deleteTodo(id);
  };

  return (
    <ul className="m-0 p-0 list-none">
      {todos.map((todo, index) => (
        <TodoItem
          todo={todo}
          key={todo.id}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
};

export default TodoList;