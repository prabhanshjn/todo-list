import React from "react";
import {NavLink} from "react-router-dom"

export default function Menu(){
    return(
        <nav>
            <NavLink exact activeClassName={"active_class"} to = "/">Create</NavLink>
            <NavLink exact activeClassName={"active_class"} to = "/list">List</NavLink>
        </nav>
    )
}