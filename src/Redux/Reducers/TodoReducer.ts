// @ts-ignore
import { Action } from "../action";
import { addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
// @ts-ignore
import { db } from "../../Config/firebase";
// @ts-ignore
import { NewTodo } from "../../todoType";

export interface stateType {
  todos: NewTodo[];
}

const initialData: stateType = {
  todos: [],
};

function deleteTodo(state: NewTodo[], id: number, fid: string) {
  const updatedTodo = [...state].filter((todo) => todo.id !== id);

  deleteDoc(doc(db, "Todo", fid));
  // console.log(updatedTodo)

  return updatedTodo;
}

function copyTodo(state: NewTodo[], id: number) {
  const updatedTodo = [...state];
  const temp = [...updatedTodo];
  updatedTodo.map((todo: NewTodo) => {
    if (todo.id === id) {
      const copyTodo = {
        ...todo,
        id: new Date().getTime(),
      };
      // @ts-ignore
      temp.push(copyTodo);
    }
  });
  return temp;
}

function completeTodo(state: NewTodo[], id: number, fid: string) {
  const todoRef = doc(db, "Todo", fid);
  const updatedTodo = [...state];
  updatedTodo.map((todo) => {
    if (todo.id === id) {
      todo.completed = !todo.completed;
    }
    updateDoc(todoRef, {
      completed: todo.completed,
    });
  });

  return updatedTodo;
}

function editTodo(state: NewTodo[], edit: string, id: number, fid: string) {
  const todoRef = doc(db, "Todo", fid);
  const updatedTodo = [...state];
  updatedTodo.map((todo) => {
    if (todo.id === id) {
      todo.text = edit;
    }
    updateDoc(todoRef, {
      text: todo.text,
    });
  });

  return updatedTodo;
}

const TodoReducer = (state = initialData, action: any) => {
  switch (action.type) {
    case Action.SET_TODO:
      return {
        ...state,
        todos: action.data,
      };
    case Action.DELETE_TODO:
      return {
        ...state,
        todos: deleteTodo(state.todos, action.data.id, action.data.fid),
      };
    case Action.COPY_TODO:
      return {
        ...state,
        todos: copyTodo(state.todos, action.data),
      };
    case Action.COMPLETE_TODO:
      return {
        ...state,
        todos: completeTodo(state.todos, action.data.id, action.data.fid),
      };
    case Action.EDIT_TODO:
      return {
        ...state,
        todos: editTodo(
          state.todos,
          action.data.edit,
          action.data.id,
          action.data.fid
        ),
      };
    default:
      return state;
  }
};

export default TodoReducer;
