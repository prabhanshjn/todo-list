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

    function deleteTodo(id: number){
        const updatedTodo = [...todos].filter((todo) => id !== todo.id)

        setTodos(updatedTodo)
    }


    function editTodo(id: number){


        const updatedTodo = [...todos].map((todo) => {
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
                        desc: todo.detail.text,
                    },
                    completed: false,
                    dateModified: new Date().toDateString()
                }
                setTodos([...todos].concat([newTodo]))
            }

        })
    }
    // @ts-ignore
    return(
        <>

                {todos.map((todo) =>


                    <div key={todo.id} className={"px-10 mb-8"}>



                            <div className={"flex flex-row items-center justify-evenly"}>
                                <input type="checkbox" className="checkbox mr-2" defaultChecked={false}  onClick={() => checkTodo(todo.id)}/>

                                <div tabIndex="0" className="collapse mr-auto">
                                    {todo.id === editTodoId?
                                        (<input placeholder={"Edit Todo"} className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"} type={"text"} value={editTodoText} onChange={(e) => setEditTodoText(e.target.value)}/>):

                                        (<div>

                                        <h3 className={todo.completed? ("collapse-title text-xl font-medium line-through") : ("collapse-title text-xl font-medium")}>
                                            {todo.detail.text}
                                        </h3>
                                        <div className="collapse-content">
                                            <p>{todo.detail.desc}</p>
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


                            <span className={"text-sm italic"}> {todo.dateModified}</span>


                        <hr />


                    </div>)}

        </>
    )
}