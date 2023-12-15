'use client';
import { Todo } from "@/types/todo";
import TodoItem from "./todo-item";
import { deleteTodo, updateTodo } from "@/utils/todo-actions";
import { useRouter } from "next/navigation";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

const TodoList = ({
  todos,
}: {
  todos: Todo[];
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null); // [1]
  const router = useRouter();

  const closeModal = () => {
    setIsOpen(false)
    setSelectedTodo(null)
  }

  const openModal = ()  => {
    setIsOpen(true)
  }

  const handleUpdate = async (todo: Todo) => {
    await updateTodo({
      ...todo,
      completed: !todo.completed
    });
    router.refresh();
  };

  const handleDelete = async (id: number) => {
    await deleteTodo(id);

    router.refresh();
  };

  const handleView = (todo: Todo) => {
    openModal()
    setSelectedTodo(todo)
  }

  return (
    <>
    <ul className="m-0 p-0 list-none">
      {todos.map((todo, index) => (
        <TodoItem
          todo={todo}
          key={todo.id}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          onView={handleView}
        />
      ))}
    </ul>
    <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {selectedTodo?.title}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      {selectedTodo?.description}
                    </p>
                  </div>

                  <div className="text-sm mt-4">Status: {selectedTodo?.completed ? 'Completed': 'Active'}</div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
  </>
  );
};

export default TodoList;