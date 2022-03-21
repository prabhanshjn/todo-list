import React from "react"
import {Route,Switch} from "react-router-dom";
import Create from "./components/Create";
import List from "./components/List";
import Menu from "./components/Menu";

/*
2. Router
3. Connect With Firebase
4.add css (tailwindcss)
*/

export default function App(){
  const [todos,setTodos] = React.useState([])

    function setNewTodo(todoText){

      const newTodo = {
          id: new Date().getTime(),
          text: todoText,
          completed: false,
          dateModified: new Date().toDateString()
      }

      setTodos([...todos].concat([newTodo]))
    }




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

          <Menu />

        <Switch>
          <Route exact path={"/"} >

              <Create
                  setNewTodo = {setNewTodo}
              />
          </Route>

          <Route exact path={"/list"}>
              <List
                  todos = {todos}
                  setTodos={setTodos}
              />
          </Route>
        </Switch>
      </div>
  )
}