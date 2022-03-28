export interface NewTodo {
    id: number;
    detail: {
        text: string;
        desc: string;
    }
    deadline: Date;
    completed: boolean;
    dateModified: string;
    category: string;

}