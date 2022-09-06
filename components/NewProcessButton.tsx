import React, {ChangeEventHandler} from "react";
import Link from "next/link";
import {RefreshIcon} from "@heroicons/react/solid";

const NewProcessButton = () => {

    return (<>
        <Link href="/new_process">
            <a className="btn btn-accent w-60 ml-4 mb-4 font-medium normal-case group">
                Create process
                <span className="ml-2 group-hover:animate-spin">
                    <RefreshIcon className="w-6 h-6 scale-x-[-1]"/>
                </span>
            </a>
        </Link>
    </>)
}

export default NewProcessButton