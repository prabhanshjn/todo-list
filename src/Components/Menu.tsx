import React from "react";
import { Link, NavLink } from "react-router-dom";
import { auth } from "../Config/firebase";

// @ts-ignore
export default function Menu({ isAuth, signUserOut }) {
  return (
    <div className="navbar bg-base-100 mb-12">
      <div className="flex-1">
        <Link to={"/"} className="btn btn-ghost normal-case text-xl">
          Todo List
        </Link>
        {/*@ts-ignore */}
        <h1>{isAuth && `Hi ${auth.currentUser.displayName}!`}</h1>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          {isAuth && (
            <>
              <li>
                <NavLink activeClassName={"menu menu-horizontal p-0"} to={"/"}>
                  Add Todo
                </NavLink>
              </li>
              <li>
                <NavLink
                  activeClassName={"menu menu-horizontal p-0"}
                  to={"/list"}
                >
                  View Todo
                </NavLink>
              </li>
            </>
          )}
          <li>
            {!isAuth ? (
              <NavLink
                activeClassName={"menu menu-horizontal p-0"}
                to={"/login"}
              >
                Login
              </NavLink>
            ) : (
              <button onClick={signUserOut}> Sign Out</button>
            )}
          </li>
          <li>
            <NavLink to={"/wallet"}>Wallet</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
