import React from 'react';
import {NextPage} from "next";
import CreateProcess from "./create_process";
import Link from 'next/link';


function Sidebar() {
    return (
        <h1 className="title">
            <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content mb-4">
                <li><CreateProcess/></li>
                <li className="divider"/>
                <li><Link href="/processes"><a>processes</a></Link></li>
                <li>Material</li>
                <li>Resources</li>
            </ul>
        </h1>

)}

export default Sidebar;