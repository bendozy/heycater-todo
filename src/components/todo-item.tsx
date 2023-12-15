'use client';
import { Todo } from '@/types/todo';
import { CheckIcon, EyeIcon, TrashIcon } from '@heroicons/react/24/outline';
import classnames from 'classnames';
import React from 'react';

interface TodoItemProps {
  todo: Todo;
  onUpdate: (todo: Todo) => void;
  onDelete: (id: number) => void;
  onView: (todo: Todo) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onUpdate, onDelete, onView }) => {
  const { id } = todo;

  const handleToggleComplete = () => {
    onUpdate(todo);
    alert('Todo updated successfully');
  };

  const handleDelete = () => {
    onDelete(Number(id));
    alert('Todo deleted successfully');
  };

  const handleView = () => {
    onView(todo);
  };

  return (
    <li
      className={classnames(
        'relative border-b first:border-t border-gray-300 text-xl py-2',
        {
          completed: todo.completed,
        }
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            className="mr-2 hidden"
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggleComplete}
          />
          <label htmlFor={id} className="cursor-pointer" onClick={handleToggleComplete}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-10 h-10 mr-2"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                fill='none'
                stroke={todo.completed ? 'green' : 'currentColor'}
                strokeWidth="1"
              />
              {todo.completed && <CheckIcon className="text-green-500 w-3" />}
            </svg>
          </label>
          <span
            className={classnames('ml-2', {
              'line-through': todo.completed,
              'text-green-500': todo.completed,
            })}
          >
            {todo.title}
          </span>
        </div>
        <div className='flex'>
          <button className='bg-black flex items-center justify-center px-2 py-1 rounded text-white mr-2' onClick={handleView}>
            <EyeIcon className="w-5 h-5" />
          </button>
          <button className='bg-red-700 flex items-center justify-center px-2 py-1 rounded text-white' onClick={handleDelete}>
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
