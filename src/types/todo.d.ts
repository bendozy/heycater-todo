export type Todo = {
  id: string;
  title: string;
  description: string;
  ip: string;
  completed: boolean;
};

export type SearchData = {
  status?: string;
  page: number;
  limit: number;
  ip: string;
};


export type TodoFormData  = {
  title: string;
  description: string;
  ip:string;
}