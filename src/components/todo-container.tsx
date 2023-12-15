import { HomeIcon, PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import TodoList from './todo-list';
import TabGroup from './tab-group';
import { SearchData, Todo } from '@/types/todo';
import Pagination from './pagination';

type TodoContainerProps = {
  todos: Todo[];
  searchData: SearchData;
};

const TodoContainer = ({ todos, searchData }: TodoContainerProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full">
        <TabGroup searchData={searchData} />
        <div className='text-black mt-2 '>
          <TodoList
            todos={todos}
          />
        </div>
      </div>
      <Pagination searchData={searchData} pageDataCount={todos.length} />
      <div className=" w-full py-4  mt-5">
        <Link
          href="/add"
          className="flex items-center justify-center px-4 py-2 text-white bg-black rounded-lg hover:bg-gray-600"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Todo
        </Link>
      </div>
    </div>
  );
};

export default TodoContainer;
