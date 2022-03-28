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
    const [category,setCategory] = React.useState<string>("")


    function handleSubmit(e: React.FormEvent){
        e.preventDefault()

        if(todoText === ""){
            alert("Empty Todo is Not Allowed")

        }else{
           // @ts-ignore
            setNewTodo(todoText, todoDesc, dueDate,category)

        }


        setTodoText("")
        setTodoDesc("")
        setDueDate(new Date())
        setCategory("")
    }
    return(
        <div className={"content-center px-10"}>

            <DateTimePicker
            onChange = {setDueDate}
            value = {dueDate}
            />

            <form onSubmit={handleSubmit}>
                <div className={"flex flex-row"}>
                <input className={"input input-bordered w-full mr-8 mb-8"} placeholder={"Add Your Todo"} type={"text"} value={todoText} onChange={(e) => setTodoText(e.target.value)}/>
                <button className={"btn"} type={"submit"}>Add Todo</button>
                </div>
                <textarea className="textarea textarea-bordered w-full" value={todoDesc} onChange={(e) => setTodoDesc(e.target.value)} placeholder="Description Of Todo"></textarea>

            </form>
            <div className="dropdown">
                <label tabIndex={0} className="btn m-1">Category</label>
                <ul tabIndex={0}  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li onClick={() => setCategory("Study")}><a>Study</a></li>
                    <li onClick={() => setCategory("Personal")}><a>Personal</a></li>
                    <li onClick={() => setCategory("Finance")}><a>Finance</a></li>
                    <li onClick={() => setCategory("Others")}><a>Others</a></li>
                </ul>
            </div>
        </div>
    )
}

export default Create;