// @ts-ignore
import React from "react";
// @ts-ignore
import DateTimePicker from "react-datetime-picker";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../Config/firebase";
import { useHistory } from "react-router-dom";
// @ts-ignore
import Modal from "./Modal";

interface Props {
  isAuth: boolean;
}

const Create: ({ isAuth }: Props) => JSX.Element = ({ isAuth }: Props) => {
  const [todoText, setTodoText] = React.useState<string>("");
  const [todoDesc, setTodoDesc] = React.useState<string>("");
  const [dueDate, setDueDate] = React.useState<Date>(new Date());
  const [category, setCategory] = React.useState<string>("Choose Category");

  const todosCollectionRef = collection(db, "Todo");
  let history = useHistory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (todoText === "") {
      alert("Empty Todo is Not Allowed");
    } else {
      await addDoc(todosCollectionRef, {
        text: todoText,
        desc: todoDesc,
        dueDate,
        category,
        id: new Date().getTime(),
        dateModified: new Date().toDateString(),
        completed: false,
        // @ts-ignore
        author_name: auth.currentUser.displayName,
        // @ts-ignore
        author_id: auth.currentUser.uid,
      });
      //setNewTodo(todoText, todoDesc, dueDate,category)
      history.push("/list");
    }

    setTodoText("");
    setTodoDesc("");
    setDueDate(new Date());
    setCategory("");
  };

  React.useEffect(() => {
    if (!isAuth) {
      history.push("/login");
    }
  }, []);
  return (
    <div className={"content-center px-10"}>
      <DateTimePicker onChange={setDueDate} value={dueDate} />

      <form onSubmit={handleSubmit}>
        <div className={"mt-8 flex flex-row"}>
          <input
            className={"input input-bordered w-full mr-8 mb-8"}
            placeholder={"Add Your Todo"}
            type={"text"}
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
          />
          <button className={"btn"} type={"submit"}>
            Add Todo
          </button>
        </div>
        <textarea
          className="textarea textarea-bordered w-full"
          value={todoDesc}
          onChange={(e) => setTodoDesc(e.target.value)}
          placeholder="Description Of Todo"
        ></textarea>
      </form>
      <div className="mt-6 dropdown">
        <label tabIndex={0} className="btn m-1">
          {category}
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li onClick={() => setCategory("Study")}>
            <a className={category === "Study" ? "active" : ""}>Study</a>
          </li>
          <li onClick={() => setCategory("Personal")}>
            <a className={category === "Personal" ? "active" : ""}>Personal</a>
          </li>
          <li onClick={() => setCategory("Finance")}>
            <a className={category === "Finance" ? "active" : ""}>Finance</a>
          </li>
          <li onClick={() => setCategory("Others")}>
            <a className={category === "Others" ? "active" : ""}>Others</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Create;
