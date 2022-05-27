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
                <button className="btn btn-ghost btn-circle">
                    <div className="indicator">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                        </svg>
                        <span className="badge badge-xs badge-primary indicator-item"></span>
                    </div>
                </button>
            </div>
        </div>
    )
}

export default Topbar;