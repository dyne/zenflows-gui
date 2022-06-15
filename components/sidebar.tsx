import React from 'react';
import Link from 'next/link';
import SideBarButton from "./brickroom/SideBarButton";
import {useRouter} from "next/router";
import {HomeIcon} from "@heroicons/react/solid";

const SideBarProps = {
    newProcess: {text: "New Process",link:"/new_process"},
    menu: [{
            name: "Home",
            link: "/",
            svg: <HomeIcon className="w-5 h-5 float-left mr-2"/>
        },
        {
            name: "Processes",
            link: "/processes",
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
    const router = useRouter()
    const isActive = (path: string) => path === router.asPath
    console.log(router.asPath)
    return (
        <div className="title">
            <ul className=" p-4 overflow-y-auto w-80 text-base-content mb-4">
                <li><Link href={SideBarProps.newProcess.link}>
                    <a className="btn btn-primary btn-block">
                        {SideBarProps.newProcess.text}
                    </a></Link>
                </li>
                <li className="divider"/>
                {SideBarProps.menu.map((m) => <li key={m.name}>
                    <SideBarButton
                        text={m.name}
                        link={m.link}
                        active={isActive(m.link)}
                        svg={m.svg}
                /></li>)}
            </ul>
        </div>
    )
}

export default Sidebar;