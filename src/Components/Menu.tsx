import React from "react";
import {Link} from "react-router-dom"



export default function Menu({isAuth,signUserOut}){
    return(
        <div className="navbar bg-base-100 mb-12">
            <div className="flex-1">
                <Link to={"/"} className="btn btn-ghost normal-case text-xl">Todo List</Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal p-0">
                    <li><Link  activeClassName={"menu menu-horizontal p-0"} to={"/"}>Add Todo</Link></li>
                    <li><Link  activeClassName={"menu menu-horizontal p-0"} to={"/list"}>View Todo</Link></li>
                    <li>{!isAuth? <Link  activeClassName={"menu menu-horizontal p-0"} to={"/login"}>Login</Link> : <button onClick={signUserOut}> Sign Out</button> }</li>
                </ul>
            </div>
        </div>
    )
}