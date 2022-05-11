import React, {ReactNode} from 'react';
import Sidebar from "./sidebar"
import Topbar from "./topbar";

type layoutProps = {
    children: ReactNode
}


const Layout:React.FunctionComponent<layoutProps> = (layoutProps:layoutProps) => {
    return (
        <>
            <Topbar/>
            <div className="drawer drawer-mobile" >
                <input id = "my-drawer" type = "checkbox" className = "drawer-toggle" />
                <div className="drawer-content">
                    {layoutProps?.children}
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