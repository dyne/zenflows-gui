import React, {ChangeEventHandler} from "react";
import Link from "next/link";
import {RefreshIcon} from "@heroicons/react/solid";

const NewProcessButton = () => {

    return (<>
        <Link href="/new_process">
            <a className="btn btn-accent w-60 ml-4 mb-4 font-medium normal-case group">
                Create process
                <span className="ml-2">
                    <RefreshIcon className="w-6 h-6 group-hover:animate-spin"/>
                </span>
            </a>
        </Link>
    </>)
}

export default NewProcessButton