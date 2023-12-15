import { SearchData, Todo, TodoFormData } from "@/types/todo";
import supabase from "./supabase";
import { z } from "zod";
import { revalidatePath } from 'next/cache';

export async function createTodo( todoFormData: TodoFormData): Promise<any> {

  try {
    await supabase
      .from("todos")
      .insert(todoFormData);

    return { message: `Added todo ${todoFormData.title}` };
  } catch (e) {
    console.log({e});
    
    return { message: 'Failed to create todo' };
  }
}

export const getTodos = async (searchData: SearchData): Promise<Todo[]> => {
  const limit = searchData.limit;
  const page = searchData.page;

  let query = supabase
    .from("todos")
    .select("*")
    .eq('ip', searchData.ip)
    .order("id", { ascending: false });

  if (searchData.status) {
    if (searchData.status === 'completed') {
      query = query.is('completed', true);
    } else if (searchData.status === 'active') {
      query = query.is('completed', false);
    }
  }

  const { data: todos, error } = await query.range((page! - 1) * limit!, page! * limit! - 1);

  if (error) throw error;


  revalidatePath('/');
  return todos!;
}

export async function deleteTodo(id: number): Promise<void> {
  const { error } = await supabase.from("todos").delete().eq("id", id);
  if (error) throw error; 
}

export async function updateTodo(
  todo: Todo
): Promise<void> {
  const { error } = await supabase
    .from("todos")
    .update(todo)
    .eq("id", todo.id);
  if (error) throw error;
}

export async function batchUpdateTodos(ids: number[], updates: Partial<TodoFormData>): Promise<void> {
  const { error } = await supabase
    .from("todos")
    .update(updates)
    .in("id", ids);
  if (error) throw error;
}

export async function batchDeleteTodos(ids: number[]): Promise<void> {
  const { error } = await supabase
    .from("todos")
    .delete()
    .in("id", ids);
  if (error) throw error;
}
