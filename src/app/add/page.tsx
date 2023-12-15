
import { createTodo } from "@/utils/todo-actions";
import Link from 'next/link';
import { HomeIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
;

export default async function FormPage() {
  const ip = headers().get("x-forwarded-for") as string;
  
  async function createTodoAction(formData: FormData) {
 
   'use server'
    const schema = z.object({
      title: z.string(),
      description: z.string(),
      ip: z.string()
    });
  
    const parse = schema.safeParse({
      title: formData.get('title'),
      description: formData.get('description'),
      ip: formData.get('ip')
    });
  
    if (!parse.success) {
      return { message: 'Failed to create todo' };
    }
  
    const data = parse.data;
    await createTodo(data);

    revalidatePath('/');
    redirect('/')
  }
  

  return (
    <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
      <h1 className="text-4xl sm:text-5xl md:text-3xl font-bold mb-10 text-black">
        Add Todo
      </h1>
      <div>
        <form
          action={createTodoAction}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              rows={10}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <input name="ip" type="hidden" value={ip} />
          </div>
          <div className="flex between">
            <button
              type="submit"
              className="flex items-center justify-center px-4 py-2 text-white bg-black rounded-lg hover:bg-gray-600"
              
            >
              <PencilSquareIcon className="w-5 h-5 mr-2" />
              Add Todo
            </button>
            <Link
              href="/"
              className="flex items-center justify-center px-4 py-2 ml-4 text-white bg-black rounded-lg hover:bg-gray-600"
            >
              <HomeIcon className="w-5 h-5 mr-2" />
              Home
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
