import React from 'react';

import SideBarButton from "./SideBarButton";
import {useRouter} from "next/router";

type SideBarMenuProps = {menu:Array<{name: string, link: string, svg?: any }>, title?: string}


function Sidebar({menu, title}:SideBarMenuProps) {
    const router = useRouter()
    const isActive = (path: string) => path === router.asPath
    return (<>
            <h4 className="ml-4 mt-8">
                {title}
                    </h4>
            <ul className="overflow-y-auto w-60 m-4 text-base-content mb-4 border border-white rounded-md">
                {menu.map((m) => <li key={m.name}>
                    <SideBarButton
                        text={m.name}
                        link={m.link}
                        active={isActive(m.link)}
                        svg={m?.svg}
                /></li>)}
            </ul>
        </>
    )
}

export default Sidebar;