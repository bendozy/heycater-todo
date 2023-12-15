
import Image from 'next/image';
import TodoContainer from '@/components/todo-container';
import { SearchData } from '@/types/todo';
import { getTodos } from '@/utils/todo-actions';

const Home = async ({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1;
  const limit = typeof searchParams.limit === 'string' ? Number(searchParams.limit) : 10;
  const status = typeof searchParams.status === 'string' ? searchParams.status : undefined;
  const clientIp = typeof searchParams.clientIp === 'string' ? searchParams.clientIp : '';

  const searchData: SearchData = { page, limit, status, clientIp };

  const todos = await getTodos(searchData);
  

  return (
    <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
      <h1 className="text-4xl sm:text-3xl md:text-3xl font-bold mb-4 text-black">
        Interactive Task List with Next.js
      </h1>
      <div>
        <TodoContainer todos={todos} searchData={searchData} />
      </div>
    </div>
  );
};

export default Home;
