import React from "react";
import {NavLink} from "react-router-dom"



export default function Menu(){
    return(
        <div className="navbar bg-base-100 mb-12">
            <div className="flex-1">
                <NavLink to={"/"} className="btn btn-ghost normal-case text-xl">Todo List</NavLink>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal p-0">
                    <li><NavLink exact activeClassName={"menu menu-horizontal p-0"} to={"/"}>Add Todo</NavLink></li>
                    <li><NavLink exact activeClassName={"menu menu-horizontal p-0"} to={"/list"}>View Todo</NavLink></li>
                </ul>
            </div>
        </div>
    )
}