import React from "react";

export default function List({todos,setTodos}){
    const [editTodoId, setEditTodoId] = React.useState(null)
    const [editTodoText,setEditTodoText] = React.useState("")

    function deleteTodo(id){
        const updatedTodo = [...todos].filter((todo) => id !== todo.id)

        setTodos(updatedTodo)
    }


    function editTodo(id){


        const updatedTodo = [...todos].map((todo) => {
            if(todo.id === id){
                todo.text = editTodoText;
            }
            return todo
        })

        setTodos(updatedTodo)
        setEditTodoText("")
        setEditTodoId(null)
    }

    function checkTodo(id){
        const updatedTodos = [...todos].map((todo) => {

            if(todo.id === id){
                todo.completed = !todo.completed
            }
            return todo
        })

        setTodos(updatedTodos)
    }
    function copyTodo(id){
        [...todos].map((todo) => {

            if(todo.id === id){
                const newTodo = {
                    id: new Date().getTime(),
                    text: todo.text,
                    completed: false,
                    dateModified: new Date().toDateString()
                }
                setTodos([...todos].concat([newTodo]))
            }

        })
    }
    return(
        <>
            <ol className={"list-decimal"}>
                {todos.map((todo) =>


                    <div key={todo.id} className={"px-10 mb-8"}>

                        <li>

                            <div className={"flex flex-row items-center justify-evenly"}>
                                <div className={"mr-auto"} >

                                    {todo.id === editTodoId?
                                        (<input placeholder={"Edit Todo"} className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"} type={"text"} value={editTodoText} onChange={(e) => setEditTodoText(e.target.value)}/>) :

                                        (<h3 onClick={() => checkTodo(todo.id)} className={todo.completed? ("text-xl line-through"):("text-xl")}>{todo.text}</h3>)
                                    }
                                </div>

                                <div className={"self-stretch"}>


                            <button  className={"mr-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"} onClick={() => deleteTodo(todo.id)}><img className={"w-6"}  src={"https://img.icons8.com/material-sharp/344/filled-trash.png"}/></button>

                                    {todo.id === editTodoId?
                                        (<button className={"mr-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"} onClick={() => editTodoText===""? alert("Empty Message not allowed"): editTodo(todo.id)}><img className={"w-6"}  src={"https://img.icons8.com/ios-filled/344/save--v1.png"}/></button>) :
                                        (<button className={"mr-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"}
                                                 onClick={() => setEditTodoId(todo.id)}><img className={"w-6"}  src={"https://img.icons8.com/ios-filled/344/edit-file.png"}/></button>)}

                                    <button className={"bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"} onClick={() => copyTodo(todo.id)}><img className={"w-6"}  src={"https://img.icons8.com/ios-glyphs/344/copy.png"}/></button>
                            </div>

                            </div>


                            <span> {todo.dateModified}</span>

                        </li>


                    </div>)}
            </ol>
        </>
    )
}