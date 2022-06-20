import React from "react";
import Link from "next/link";

type SideBarButtonProps = {
    text: string,
    link: string,
    active?: boolean,
    svg?: React.ReactNode;
}

const SideBarButton = ({ text, link, active, svg }: SideBarButtonProps) => {
    const css = `border-l-4 gap-2 left-4 pl-0 btn btn-ghost btn-block font-medium normal-case text-white ${!active && `bg-[#101828]`}
     border-0 hover:bg-neutral-focus hover:border-l-accent ${active && `border-l-accent bg-neutral-focus`}`

    return (<Link href={link}>

        <a className={css}>
            <span className="flex flex-row items-center w-full pl-3 text-left">
                <>
                    {svg}
                    {text}
                </>
            </span>

        </a>
    </Link>)
}
export default SideBarButton