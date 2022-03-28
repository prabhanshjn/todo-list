import React, {FC}from "react";
// @ts-ignore
import DateTimePicker from 'react-datetime-picker'

interface Props{
    setNewTodo: void;

}


const Create: ({setNewTodo}: Props) => JSX.Element = ({setNewTodo}: Props) => {
    const [todoText,setTodoText] = React.useState<string>("")
    const [todoDesc, setTodoDesc] = React.useState<string>("")
    const [dueDate,setDueDate] = React.useState<Date>(new Date())


    function handleSubmit(e: React.FormEvent){
        e.preventDefault()

        if(todoText === ""){
            alert("Empty Todo is Not Allowed")

        }else{
           // @ts-ignore
            setNewTodo(todoText, todoDesc, dueDate)

        }


        setTodoText("")
        setTodoDesc("")
        setDueDate(new Date())
    }
    return(
        <div className={"content-center px-10"}>

            <DateTimePicker
            onChange = {setDueDate}
            value = {dueDate}
            />

            <form onSubmit={handleSubmit}>
                <div className={"flex flex-row "}>
                <input className={"input input-bordered w-full mr-8 mb-8"} placeholder={"Add Your Todo"} type={"text"} value={todoText} onChange={(e) => setTodoText(e.target.value)}/>
                <button className={"btn"} type={"submit"}>Add Todo</button>
                </div>
                <textarea className="textarea textarea-bordered w-full" value={todoDesc} onChange={(e) => setTodoDesc(e.target.value)} placeholder="Description Of Todo"></textarea>

            </form>
        </div>
    )
}

export default Create;