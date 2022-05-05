import React from 'react';
import {NextPage} from "next";
import Sidebar from "./sidebar"
import Topbar from "./topbar";

type layoutProps = {
    children: Element
}


const Layout:React.FunctionComponent<Element> = ({children}:layoutProps) => {
    return (
        <>
            <Topbar/>
            <div className="drawer drawer-mobile" >
                <input id = "my-drawer" type = "checkbox" className = "drawer-toggle" />
                <div className="drawer-content">
                    {children}
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer" className="drawer-overlay">barra laterale</label>
                    <Sidebar/>
                </div>
            </div>
        </>

    )
}

export default Layout;