import React from 'react';
import Link from 'next/link';

import {HomeIcon, UserGroupIcon, GlobeIcon} from "@heroicons/react/solid";
import LoginBtn from "./LoginMenu";
import SideBarMenu from "./brickroom/SideBarMenu";
import NewProcessButton from "./NewProcessButton";

const SideBarProps = {
    newProcess: {text: "New Process",link:"/new_process"},
    menu1: [{
            name: "Home",
            link: "/",
            svg: <HomeIcon className="w-5 h-5 float-left mr-2"/>
        },
    {
            name: "Local",
            link: "/local",
            svg: <UserGroupIcon className="w-5 h-5 float-left mr-2"/>
        },
    {
            name: "Federation",
            link: "/fed",
            svg: <GlobeIcon className="w-5 h-5 float-left mr-2"/>
        },],
    menu: [
        {
            name: "Processes",
            link: "/processes",
            svg: "",
        },

        {
            name: "Resources",
            link: "/my_inventory",
        },
        {
            name: "Local",
            link: "/local",
        }]
}

function Sidebar() {
    return (<>
        <div className="title text-primary-content">
            <div className="w-full">
                <Link href="/">
                    <a>
                        <div className="logo mx-auto my-4"/>
                    </a>
                </Link>
            </div>
            <SideBarMenu menu={SideBarProps.menu1}/>
             <SideBarMenu menu={SideBarProps.menu} title={'MyReflow'}/>
            <NewProcessButton/>
            <br/>
            <LoginBtn/>
        </div></>
    )
}

export default Sidebar;