import React from 'react';
import {NextPage} from "next";
import CreateProcess from "./create_process";

function Sidebar() {
    return (
        <>

            <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
                <li><CreateProcess/></li>
                <div className="divider"/>
                <li>Processes</li>
                <li>Material</li>
                <li>Resources</li>
            </ul>
        </>

)}

export default Sidebar;