import React from "react"
import {Route,Routes} from "react-router-dom";
import Create from "./components/Create";
import List from "./components/List";
/*
2. Router
3.add css (tailwindcss)
 */

export default function App(){
  const [todos,setTodos] = React.useState([])
  const [todo, setTodo] = React.useState("")



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
        <Create
            todos = {todos}
            setTodos={setTodos}
            todo = {todo}
            setTodo = {setTodo}
        />
        <List
            todos = {todos}
            setTodos={setTodos}
        />


        {/*<Routes>*/}
        {/*  <Route path={"/"} element = {<Create*/}
        {/*      todos = {todos}*/}
        {/*      setTodos={setTodos}*/}
        {/*      todo = {todo}*/}
        {/*      setTodo = {setTodo}*/}
        {/*  />} />*/}

        {/*  <Route path={"/list"} element = { <List*/}
        {/*      todos = {todos}*/}
        {/*      setTodos={setTodos}*/}
        {/*      deleteTodo={deleteTodo}*/}
        {/*  />} />*/}

        {/*</Routes>*/}
      </div>
  )
}