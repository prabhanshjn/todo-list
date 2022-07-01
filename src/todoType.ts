export interface NewTodo {
  fid: string;
  id: number;
  text: string;
  desc: string;
  dueDate: Date;
  completed: boolean;
  dateModified: string;
  category: string;
}

export interface FirebaseTodo {
  text: string;
  desc: string;
  dueDate: Date;
  category: string;
  id: number;
  dateModified: string;
  completed: boolean;
  author_name: string;
  author_id: number;
}
