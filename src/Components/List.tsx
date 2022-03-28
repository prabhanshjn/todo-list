import React from "react";
// @ts-ignore
import {NewTodo} from "../types";

interface Props{
    todos: NewTodo[];
    setTodos:  React.Dispatch<React.SetStateAction<NewTodo[]>>;

}

export default function List({todos,setTodos}: Props){
    const [editTodoId, setEditTodoId] = React.useState<any>(null)
    const [editTodoText,setEditTodoText] = React.useState<string>("")
    const[sort,setSort] = React.useState<string>("")

    function deleteTodo(id: number){
        const updatedTodo = [...todos].filter((todo) => id !== todo.id)

        setTodos(updatedTodo)
    }


    function editTodo(id: number){


        const updatedTodo = [...todos].map((todo: NewTodo) => {
            if(todo.id === id){
                todo.detail.text = editTodoText;
            }
            return todo
        })

        setTodos(updatedTodo)
        setEditTodoText("")
        setEditTodoId(null)
    }

    function checkTodo(id: number){
        const updatedTodos = [...todos].map((todo) => {

            if(todo.id === id){
                todo.completed = !todo.completed
            }
            return todo
        })

        setTodos(updatedTodos)
    }
    function copyTodo(id: number){
        [...todos].map((todo) => {

            if(todo.id === id){
                const newTodo = {
                    id: new Date().getTime(),
                    detail:{
                        text: todo.detail.text,
                        desc: todo.detail.desc,
                    },
                    deadline: todo.deadline,
                    completed: false,
                    dateModified: new Date().toDateString(),
                    category: todo.category
                }
                setTodos([...todos].concat([newTodo]))
            }

        })
    }

    function sortByName (todos: NewTodo[]){
       // setIsLoad(false)
        const sortedTodos = [...todos].sort(function (a, b){
            let x = a.detail.text.toLowerCase();
            let y = b.detail.text.toLowerCase();
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;

        })
        setTodos(sortedTodos)

    }

    function sortByDate(todos: NewTodo[]){
      const sortedTodos =   [...todos].sort(function(a, b){return a.id - b.id});
      setTodos(sortedTodos)
    }



    React.useEffect(() => {

        if(sort === "name"){

            sortByName(todos)

        }else if(sort === "date"){
            sortByDate(todos)
        }


    },[sort])





    // @ts-ignore
    return(
        <>
            <div className="px-10 mb-8 dropdown">
                {todos.length > 0 && <>
                    <label tabIndex={0} className="btn m-1">Sort</label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li onClick={() => setSort("name")} ><a>By Name</a></li>
                    <li onClick={() => setSort("date")}><a>By Date</a></li>
                    <li onClick={() => setSort("")}><a>Remove Current Sort</a></li>
                    </ul>
                </>}

            </div>

                { todos.map((todo) =>

                    <div key={todo.id} className={"px-10 mb-8"}>

                            <div className={todo.deadline<new Date() && !todo.completed? ("flex flex-row items-center justify-evenly bg-red-700"):("flex flex-row items-center justify-evenly")}>
                                <input type="checkbox" className="checkbox mr-2" defaultChecked={false}  onClick={() => checkTodo(todo.id)}/>

                                <div tabIndex={0} className="collapse mr-auto">
                                    {todo.id === editTodoId?
                                        (<input placeholder={"Edit Todo"} className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"} type={"text"} value={editTodoText} onChange={(e) => setEditTodoText(e.target.value)}/>):

                                        (<div>
                                            <div className={"flex flex-row content-center items-center"}>
                                                <h3 className={todo.completed? ("collapse-title text-xl font-medium line-through") : ("collapse-title text-xl font-medium")}>
                                                    {todo.detail.text}
                                                </h3>
                                                {todo.category !== "" && <span className="badge ml-12">{todo.category}</span>}
                                            </div>


                                        <div className="collapse-content">
                                            <p className={"whitespace-pre-line"}>{todo.detail.desc}</p>
                                        </div>
                                        </div>)}
                                </div>

                                <div className={"self-stretch"}>

                            <button  className={"mr-4 bg-transparent py-2 px-4 rounded"} onClick={() => deleteTodo(todo.id)}><img className={"w-6"}  src={"https://img.icons8.com/material-sharp/344/filled-trash.png"}/></button>

                                    {todo.id === editTodoId?
                                        (<button className={"mr-4 bg-transparent  py-2 px-4  rounded"} onClick={() => editTodoText===""? alert("Empty Message not allowed"): editTodo(todo.id)}><img className={"w-6"}  src={"https://img.icons8.com/ios-filled/344/save--v1.png"}/></button>) :
                                        (<button className={"mr-4 bg-transparent   hover:text-white py-2 px-4  rounded"}
                                                 onClick={() => setEditTodoId(todo.id)}><img className={"w-6"}  src={"https://img.icons8.com/ios-filled/344/edit-file.png"}/></button>)}

                                    <button className={"bg-transparent  py-2 px-4  rounded"} onClick={() => copyTodo(todo.id)}><img className={"w-6"}  src={"https://img.icons8.com/ios-glyphs/344/copy.png"}/></button>
                            </div>

                            </div>


                            <span className={"text-sm italic"}> Created - {todo.dateModified} </span> <span className={"text-sm italic ml-12"}>   Due - {todo.deadline.toLocaleString()}</span>


                        <hr />


                    </div>)}

        </>
    )
}