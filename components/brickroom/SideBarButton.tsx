import React from "react";
import Link from "next/link";

type SideBarButtonProps = {
    text:string,
    link:string,
    active?:boolean,
    svg?: React.ReactNode;
}

const SideBarButton = ({text, link, active, svg}:SideBarButtonProps) => {
    const css = `border-l-4 gap-2 left-4 pl-0 btn btn-ghost btn-block
     border-0 hover:bg-orange-50 hover:border-l-primary ${active&&`border-l-primary bg-orange-50`}`

    return (<Link href={link}>

        <a className={css}>
            <span className="w-full text-left flex flex-row items-center pl-3">
                <>
                    {svg}
                    {text}
                </>
            </span>

        </a>
    </Link>)}
export default SideBarButton