import React from "react";

export default function Create({todo,setTodo,todos,setTodos}){
    function handleSubmit(e){
        e.preventDefault()

        if(todo === ""){
            alert("Empty Todo is Not Allowed")

        }else{
            const newTodo = {
                id: new Date().getTime(),
                text: todo,
                completed: false,
                dateModified: new Date().toDateString()
            }

            setTodos([...todos].concat([newTodo]))

        }


        setTodo("")
    }
    return(
        <>
            <form onSubmit={handleSubmit}>
                <input type={"text"} value={todo} onChange={(e) => setTodo(e.target.value)}/>
                <button className={"add-todo"} type={"submit"}>Add Todo</button>
            </form>
        </>
    )
}