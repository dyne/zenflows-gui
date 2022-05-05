import React from 'react';
import {NextPage} from "next";

function Sidebar() {
    return (
        <>

            <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
                <li>Processes</li>
                <li>Material</li>
                <li>Resources</li>
            </ul>
        </>

)}

export default Sidebar;