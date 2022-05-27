import React, {ReactNode} from 'react';
import Sidebar from "./sidebar"
import Topbar from "./topbar";
import {useAuth} from "../lib/auth";
import SignIn from "../pages/sign_in";


type layoutProps = {
    children: ReactNode
}


const Layout:React.FunctionComponent<layoutProps> = (layoutProps:layoutProps) => {
  const { isSignedIn } = useAuth()
    return (
        <>
            <Topbar/>
            <div className="drawer drawer-mobile" >
                <input id = "my-drawer" type = "checkbox" className = "drawer-toggle" />
                <div className="drawer-content">
                    {isSignedIn()&&layoutProps?.children}
                    {!isSignedIn()&&<SignIn/>}
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer" className="drawer-overlay">barra laterale</label>
                    {isSignedIn()&&<Sidebar/>}
                </div>
            </div>
        </>

    )
}

export default Layout;