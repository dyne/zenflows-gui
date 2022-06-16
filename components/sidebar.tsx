import React from 'react';
import Link from 'next/link';
import SideBarButton from "./brickroom/SideBarButton";
import {useRouter} from "next/router";
import {HomeIcon, UserGroupIcon, GlobeIcon} from "@heroicons/react/solid";

const SideBarProps = {
    newProcess: {text: "New Process",link:"/new_process"},
    menu1: [{
            name: "Home",
            link: "/",
            svg: <HomeIcon className="w-5 h-5 float-left mr-2"/>
        },
    {
            name: "Local",
            link: "/loc",
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
    const router = useRouter()
    const isActive = (path: string) => path === router.asPath
    console.log(router.asPath)
    return (<>
        <div className="title text-primary-content">
            <div className="w-full">
                <Link href="/">
                    <a>
                        <div className="logo mx-auto my-4"/>
                    </a>
                </Link>
            </div>


            <ul className="overflow-y-auto w-60 m-4 text-base-content border border-white rounded-md">
                {SideBarProps.menu1.map((m) => <li key={m.name}>
                    <SideBarButton
                        text={m.name}
                        link={m.link}
                        active={isActive(m.link)}
                        svg={m.svg}
                /></li>)}
            </ul>
            <h4 className="ml-4 mt-8">
                        MyReflow
                    </h4>
            <ul className="overflow-y-auto w-60 m-4 text-base-content mb-4 border border-white rounded-md">
                {SideBarProps.menu.map((m) => <li key={m.name}>
                    <SideBarButton
                        text={m.name}
                        link={m.link}
                        active={isActive(m.link)}
                        svg={m?.svg}
                /></li>)}
            </ul>
            <Link href={SideBarProps.newProcess.link}>
                <a className="btn btn-accent text-primary-content w-60 ml-4">
                    {SideBarProps.newProcess.text}
                </a>
            </Link>
        </div></>
    )
}

export default Sidebar;