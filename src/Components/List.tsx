import React from "react";
// @ts-ignore
import { NewTodo } from "../todoType";
// @ts-ignore
import { Action } from "../Redux/action";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "../Config/firebase";
// @ts-ignore
import { stateType } from "../Redux/Reducers/TodoReducer";
// @ts-ignore
import Modal from "./Modal";

interface Props {
  todos: NewTodo[];
  setTodos: React.Dispatch<React.SetStateAction<NewTodo[]>>;
  isAuth: boolean;
}

export default function List({ todos, setTodos, isAuth }: Props) {
  const [editTodoId, setEditTodoId] = React.useState<any>(null);
  const [editTodoText, setEditTodoText] = React.useState<string>("");
  const [sort, setSort] = React.useState<string>("");

  //redux
  const dispatch = useDispatch();
  // @ts-ignore
  const redux_todos = useSelector((state) => state.TodoReducer.todos);
  console.log(redux_todos);

  const redux_deleteTodo = (id: number, fid: string) => {
    dispatch({
      type: Action.DELETE_TODO,
      data: {
        id,
        fid,
      },
    });
  };
  const redux_copyTodo = (id: number, fid: string) => {
    dispatch({
      type: Action.COPY_TODO,
      data: {
        id: id,
        fid: fid,
      },
    });
  };

  const redux_completeTodo = (id: number, fid: string) => {
    dispatch({
      type: Action.COMPLETE_TODO,
      data: {
        id: id,
        fid: fid,
      },
    });
  };
  const redux_editTodo = (edit: string, id: number, fid: string) => {
    dispatch({
      type: Action.EDIT_TODO,
      data: {
        edit: edit,
        id: id,
        fid: fid,
      },
    });
    setEditTodoText("");
    setEditTodoId(null);
  };

  function sortByName(todos: NewTodo[]) {
    const sortedTodos = [...todos].sort(function (a, b) {
      const x = a.text.toLowerCase();
      const y = b.text.toLowerCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });
    setTodos(sortedTodos);
  }

  function sortByDate(todos: NewTodo[]) {
    const sortedTodos = [...todos].sort(function (a, b) {
      return a.id - b.id;
    });
    setTodos(sortedTodos);
  }

  React.useEffect(() => {
    if (sort === "name") {
      sortByName(todos);
    } else if (sort === "date") {
      sortByDate(todos);
    }
  }, [sort]);
  const history = useHistory();

  React.useEffect(() => {
    if (!isAuth) {
      history.push("/login");
    }
  }, []);

  React.useEffect(() => {
    if (auth.currentUser !== null) {
      console.log(auth);
      getTodo();
    }
  }, [auth]);

  const getTodo = async () => {
    // @ts-ignore
    if (auth !== null && auth.currentUser.uid !== null) {
      const c = collection(db, "Todo");

      // @ts-ignore
      const q = query(c, where("author_id", "==", auth.currentUser.uid));

      const querySnapshot = await getDocs(q);
      const firebaseTodo: NewTodo[] = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());

        firebaseTodo.push({
          fid: doc.id,
          ...doc.data(),
        } as NewTodo);
      });

      dispatch({
        type: Action.SET_TODO,
        data: firebaseTodo,
      });
      setTodos(firebaseTodo);
    }
  };
  console.log("Redux", redux_todos);

  return (
    <>
      <div className="px-10 mb-8 dropdown">
        {todos.length > 0 && (
          <>
            <label tabIndex={0} className="btn m-1">
              Sort
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li onClick={() => setSort("name")}>
                <a>By Name</a>
              </li>
              <li onClick={() => setSort("date")}>
                <a>By Date</a>
              </li>
              <li onClick={() => setSort("")}>
                <a>Remove Current Sort</a>
              </li>
            </ul>
          </>
        )}
      </div>
      {redux_todos.map((todo: NewTodo) => (
        <div key={todo.id} className={"px-10 mb-8"}>
          <div
            className={
              // @ts-ignore
              todo.dueDate.toDate() < new Date() && !todo.completed
                ? "flex flex-row items-center justify-evenly bg-red-700"
                : "flex flex-row items-center justify-evenly"
            }
          >
            <input
              type="checkbox"
              className="checkbox mr-2"
              defaultChecked={false}
              checked={todo.completed}
              onClick={() => redux_completeTodo(todo.id, todo.fid)}
            />

            <div tabIndex={0} className="collapse mr-auto">
              {todo.id === editTodoId ? (
                <input
                  placeholder={"Edit Todo"}
                  className={
                    "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  }
                  type={"text"}
                  value={editTodoText}
                  onChange={(e) => setEditTodoText(e.target.value)}
                />
              ) : (
                <div>
                  <div className={"flex flex-row content-center items-center"}>
                    <h3
                      className={
                        todo.completed
                          ? "collapse-title text-xl font-medium line-through"
                          : "collapse-title text-xl font-medium"
                      }
                    >
                      {todo.text}
                    </h3>
                    {todo.category !== ("" || "Choose Category") && (
                      <span className="badge ml-12">{todo.category}</span>
                    )}
                  </div>

                  <div className="collapse-content">
                    <p className={"whitespace-pre-line"}>{todo.desc}</p>
                  </div>
                </div>
              )}
            </div>

            <div className={"self-stretch"}>
              <Modal id={todo.id} fid={todo.fid} />
              <label
                htmlFor="my-modal"
                className="btn mr-4 bg-transparent py-2 px-4 rounded"
              >
                <img
                  className={"w-6"}
                  src={
                    "https://img.icons8.com/material-sharp/344/filled-trash.png"
                  }
                />
              </label>

              {todo.id === editTodoId ? (
                <button
                  className={"mr-4 bg-transparent  py-2 px-4  rounded"}
                  onClick={() =>
                    editTodoText === ""
                      ? alert("Empty Message not allowed")
                      : redux_editTodo(editTodoText, todo.id, todo.fid)
                  }
                >
                  <img
                    className={"w-6"}
                    src={"https://img.icons8.com/ios-filled/344/save--v1.png"}
                  />
                </button>
              ) : (
                <button
                  className={
                    "mr-4 bg-transparent   hover:text-white py-2 px-4  rounded"
                  }
                  onClick={() => setEditTodoId(todo.id)}
                >
                  <img
                    className={"w-6"}
                    src={"https://img.icons8.com/ios-filled/344/edit-file.png"}
                  />
                </button>
              )}

              <button
                className={"bg-transparent  py-2 px-4  rounded"}
                onClick={() => redux_copyTodo(todo.id, todo.fid)}
              >
                <img
                  className={"w-6"}
                  src={"https://img.icons8.com/ios-glyphs/344/copy.png"}
                />
              </button>
            </div>
          </div>
          <span className={"text-sm italic"}>
            {" "}
            Created - {todo.dateModified}{" "}
          </span>{" "}
          <span className={"text-sm italic ml-12"}>
            {" "}
            Due -{" "}
            {
              // @ts-ignore
              todo.dueDate.toDate().toLocaleString()
            }
          </span>
          <hr />
        </div>
      ))}
    </>
  );
}
