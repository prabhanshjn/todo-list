export interface NewTodo {
    id: number;
    detail: {
        text: string;
        desc: string;
    }
    completed: boolean;
    dateModified: string;

}