import React from "react";
import {NavLink} from "react-router-dom"

export default function Menu(){
    return(
        <nav className={"p-12 mb-12 flex text-2xl justify-evenly font-sans bg-white shadow sm:items-baseline w-full"}>
            <div className={""}>
                <NavLink className={"py-2 px-4 border-b-4 border-blue-700"} exact activeClassName={"bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"} to = "/">Create</NavLink>

            </div>
            <div className={""}>
                <NavLink exact className={"py-2 px-4 border-b-4 border-blue-700"} activeClassName={"bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"} to = "/list">List</NavLink>


            </div>


        </nav>
    )
}