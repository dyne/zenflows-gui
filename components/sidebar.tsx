import React, {useState} from 'react';
import Link from 'next/link';

import {UserGroupIcon, ArrowNarrowRightIcon, ArrowNarrowLeftIcon} from "@heroicons/react/solid";
import {ChatIcon, CubeIcon, HomeIcon, GlobeIcon, ChevronUpIcon, ChevronDownIcon} from "@heroicons/react/outline";
import LoginBtn from "./LoginMenu";
import SideBarMenu from "./brickroom/SideBarMenu";
import {useRouter} from "next/router";
import CreateProjectButton from "./NewProjectButton";
import IfSideBarButton from "./brickroom/IfSideBarButton";

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
            svg: <UserGroupIcon className="w-5 h-5 float-left mr-2"/>,
            disabled: true
        },
        {
            name: "Federation",
            link: "/fed",
            svg: <GlobeIcon className="w-5 h-5 float-left mr-2"/>,
            disabled: true
        },],
    menu: [
        {
            name: "Processes",
            link: "/processes",
            svg: "",
            disabled: true
        },

        {
            name: "Resources",
            link: "/my_inventory",
            disabled: true
        },
        {
            name: "User Profile",
            link: "/profile/my_profile",
        }],
    home: {
        name: 'Home',
        link: "/",
        svg: <HomeIcon className="w-5 h-5 float-left mr-2"/>
    },
    createAsset: {
        name: 'Create asset',
        link: '/create_project'
    },
    MyInventory: {
        name: 'My inventory',
        link: '/',
        disabled: true,
    },
    lastUpdated: {
        name: 'Last updated',
        link: '/',
        disabled: true,
    },
    seeAll: {
        name: 'See all',
        link: '/',
        disabled: true
    },
    userGuide: {
        name: 'User guide',
        link: "/",
        svg: <ChatIcon className="w-5 h-5 float-left mr-2"/>,
        disabled:true,
    },
    map: {
        name: 'Map',
        link: "/",
        svg: <GlobeIcon className="w-5 h-5 float-left mr-2"/>,
        disabled:true,
    },
}

function Sidebar() {
    const [isAssetsMenuOpen, setIsAssetsMenuOpen] = useState(false)
    const router = useRouter()
    const isActive = (path: string) => path === router.asPath
    const isNewProcess = router.asPath === '/new_process'
    return (<>
            <div className="title overflow-y-auto w-72 text-primary-content bg-white border-r border-primary">
                {!isNewProcess && <>
                    <div className="w-auto">
                        <Link href="/">
                            <a>
                                <div className="logo mx-auto my-4"/>
                            </a>
                        </Link>
                    </div>
                    <ul className="p-0">
                        <li>
                            <IfSideBarButton text={'home'} link={'/'} svg={<HomeIcon className="w-5 h-5 float-left mr-2"/>} active={isActive('/')}/>
                        </li>
                        <li tabIndex={0}>
                            <a className="ml-4 w-64 gap-2 pl-0 btn btn-ghost font-medium normal-case text-primary border-0 hover:bg-amber-200">
                                <button className={`flex flex-row items-center pl-3 text-left h-full`} onClick={()=>setIsAssetsMenuOpen(!isAssetsMenuOpen)}>
                                    <>
                                        <CubeIcon className="w-5 h-5 float-left mr-2"/>
                                        Assets
                                        {isAssetsMenuOpen? <ChevronUpIcon className="w-5 h-5 float-right ml-32"/> : <ChevronDownIcon className="w-5 h-5 float-right ml-32"/>}
                                    </>
                                </button>
                            </a>
                            {isAssetsMenuOpen && <ul className="p-2">
                                <li><IfSideBarButton text={SideBarProps.createAsset.name} link={SideBarProps.createAsset.link} active={isActive(SideBarProps.createAsset.link)}/></li>
                                <li><IfSideBarButton text={SideBarProps.MyInventory.name} link={SideBarProps.MyInventory.link} disabled={true}/></li>
                                <li><IfSideBarButton text={SideBarProps.lastUpdated.name} link={SideBarProps.lastUpdated.link} disabled={true}/></li>
                                <li><IfSideBarButton text={SideBarProps.seeAll.name} link={SideBarProps.seeAll.link} disabled={true}/></li>
                            </ul>}
                        </li>
                        <li>
                            <IfSideBarButton text={SideBarProps.userGuide.name} link={SideBarProps.userGuide.link} svg={SideBarProps.userGuide.svg} active={isActive(SideBarProps.userGuide.link)} disabled={true}/>
                        </li>
                        <li>
                            <IfSideBarButton text={SideBarProps.map.name} link={SideBarProps.map.link} svg={SideBarProps.map.svg} active={isActive(SideBarProps.map.link)} disabled={true}/>
                        </li>
                    </ul>
                    <span className="inline-block align-bottom">
                        <LoginBtn/>
                    </span> </>}
            </div>
        </>
    )
}

export default Sidebar;