import React, {FC}from "react";




const Create = (setNewTodo:(todoText: string) => void) => {
    const [todoText,setTodoText] = React.useState<string>("")

    function handleSubmit(e: React.FormEvent){
        e.preventDefault()

        if(todoText === ""){
            alert("Empty Todo is Not Allowed")

        }else{
           setNewTodo(todoText)

        }


        setTodoText("")
    }
    return(
        <div className={"content-center px-10"}>
            <form className={"flex flex-row "} onSubmit={handleSubmit}>
                <input className={"shadow mr-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"} placeholder={"Add Your Todo"} type={"text"} value={todoText} onChange={(e) => setTodoText(e.target.value)}/>
                <button className={"btn"} type={"submit"}>Add Todo</button>
            </form>
        </div>
    )
}

export default Create;