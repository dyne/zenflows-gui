import React from 'react';
import Link from 'next/link';

function Sidebar() {
    return (
        <h1 className="title">
            <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content mb-4">
                <li><Link href="/new_process"><a className="btn btn-primary">New Process</a></Link></li>
                <li className="divider"/>
                <li><Link href="/processes"><a>Processes</a></Link></li>
                <li><Link href="/my_inventory"><a>Resources</a></Link></li>
                <li><Link href="/local"><a>Local</a></Link></li>
            </ul>
        </h1>
    )}

export default Sidebar;