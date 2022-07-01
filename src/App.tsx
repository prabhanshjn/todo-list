import React from "react";
import { Route, useHistory, Switch } from "react-router-dom";
import "./index.css";
// @ts-ignore
import Create from "./Components/Create";
// @ts-ignore
import List from "./Components/List";
// @ts-ignore
import Menu from "./Components/Menu";
// @ts-ignore
import Login from "./Components/Login";
import { NewTodo } from "./todoType";
import { signOut } from "firebase/auth";
import { auth, db } from "./Config/firebase";
// @ts-ignore
import Wallet from "./Components/Wallet/Wallet";
// @ts-ignore
import { Data } from "./Components/Wallet/data";
/*
1.Create Todo Component
2. Popup
*/
const App: React.FC = () => {
  const [todos, setTodos] = React.useState<NewTodo[]>([]);
  const [isAuth, setIsAuth] = React.useState<boolean>(false);

  const history = useHistory();

  const signUserOut = () => {
    signOut(auth).then(() => {
      setIsAuth(false);
      history.push("/login");
    });
  };

  return (
    <div className={"mx-auto"}>
      <Menu isAuth={isAuth} signUserOut={signUserOut} />

      <Switch>
        <Route exact path={"/"}>
          <Create isAuth={isAuth} />
        </Route>

        <Route exact path={"/list"}>
          <List todos={todos} setTodos={setTodos} isAuth={isAuth} />
        </Route>
        <Route exact path={"/login"}>
          <Login setIsAuth={setIsAuth} />
        </Route>
        <Route exact path={"/wallet"}>
          <Wallet data={Data} />
        </Route>
      </Switch>
    </div>
  );
};
export default App;
