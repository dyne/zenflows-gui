import React from 'react';
import {NextPage} from "next";
import Link from "next/link";
import LoginBtn from "./LoginMenu";


function Topbar() {
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <label htmlFor="my-drawer"
                           className= "btn btn-square btn-ghost drawer-button lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                             className="inline-block w-5 h-5 stroke-current">
                            <path d="M4 6h16M4 12h16M4 18h16"/>
                        </svg>
                </label>
            </div>
            <div className="navbar-center">
                 <Link href="/"><a className="btn btn-ghost normal-case text-xl">ReflowApp</a></Link>
            </div>
            <div className="navbar-end">
                <LoginBtn/>
            </div>
        </div>
    )
}

export default Topbar;