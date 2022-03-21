import React from "react"
/*
1. make todo as a component
2. route
2.1 /create
2.2 /list
3.add css (tailwindcss)
 */

export default function App(){
  const [todos,setTodos] = React.useState(() => JSON.parse(localStorage.getItem("todos")) || [])
  const [todo, setTodo] = React.useState("")
  const [editTodoId, setEditTodoId] = React.useState(null)
  const [editTodoText,setEditTodoText] = React.useState("")

  React.useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])


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
      <div className={"todo"}>

        <form onSubmit={handleSubmit}>
          <input type={"text"} value={todo} onChange={(e) => setTodo(e.target.value)}/>
            <button className={"add-todo"} type={"submit"}>Add Todo</button>
        </form>


        <ol>
          {todos.map((todo) =>


              <div key={todo.id}>

                <li>

            {todo.id === editTodoId?
                (<input type={"text"} value={editTodoText} onChange={(e) => setEditTodoText(e.target.value)}/>) :

                (<div className={todo.completed? ("completedTodo"):(null)}>{todo.text}</div>)
            }
            <span> {todo.dateModified}</span>

              <button className={"margin-buttons"} onClick={() => deleteTodo(todo.id)}>Delete</button>

            {todo.id === editTodoId? (<button onClick={() => editTodo(todo.id)}>Submit Edit</button>) : (<button onClick={() => setEditTodoId(todo.id)}>Edit Todo</button>)}
              <input onClick={() => checkTodo(todo.id)} type={"checkbox"}/>
            <span>Completed?</span>

            <button className={"margin-buttons"} onClick={() => copyTodo(todo.id)}>Copy Todo</button>

              </li>


          </div>)}
        </ol>

      </div>
  )
}