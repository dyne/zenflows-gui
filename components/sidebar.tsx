import React from 'react';
import Link from 'next/link';

import {HomeIcon, UserGroupIcon, GlobeIcon, ArrowNarrowRightIcon, ArrowNarrowLeftIcon} from "@heroicons/react/solid";
import LoginBtn from "./LoginMenu";
import SideBarMenu from "./brickroom/SideBarMenu";
import NewProcessButton from "./NewProcessButton";
import {useRouter} from "next/router";

const SideBarProps = {
    newProcess: {text: "New Process", link: "/new_process"},
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
            name: "Zencode",
            link: "/zencode",
        }]
}

function Sidebar() {
    const router = useRouter()
    const isNewProcess = router.asPath === '/new_process'
    return (<>
            <div className="title text-primary-content">
                {!isNewProcess && <>
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
                    <LoginBtn/></>}
                {isNewProcess && <>
                    <button type="button"
                            className="btn btn-outline text-white w-80 my-4 mx-4"
                            onClick={() => router.back()}
                    >
                    <span className="flex flex-row items-center w-full pl-3 text-left normal-case font-medium">
                    <ArrowNarrowLeftIcon className="w-5 h-5 mr-3"/>
                     Go back and discard
                    </span>
                    </button>
                    <div className="grid grid-cols-1 w-80 mx-4 mt-20">
                        <img src="/new_process.png" sizes="21px 21px"/>
                        <h2>How to create a good process</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Neque pellentesque hendrerit ultrices mauris et non pellentesque suspendisse est. </p>
                    </div>
                </>}
            </div>
        </>
    )
}

export default Sidebar;