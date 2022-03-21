import React from "react";

export default function Create({setNewTodo}){
    const [todoText,setTodoText] = React.useState("")

    function handleSubmit(e){
        e.preventDefault()

        if(todoText === ""){
            alert("Empty Todo is Not Allowed")

        }else{
           setNewTodo(todoText)

        }


        setTodoText("")
    }
    return(
        <>
            <form onSubmit={handleSubmit}>
                <input type={"text"} value={todoText} onChange={(e) => setTodoText(e.target.value)}/>
                <button className={"add-todo"} type={"submit"}>Add Todo</button>
            </form>
        </>
    )
}